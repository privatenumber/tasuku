import {
	cursorUp, cursorDown,
	cursorSavePosition, cursorRestorePosition, eraseDown,
} from 'ansi-escapes';
import stringWidth from 'string-width';
import type {
	Renderer, RendererFactory, TaskList, TasukuTheme,
} from '../types.ts';
import { formatTaskLine } from '../utils/format-task-line.ts';
import { formatTaskOutput } from '../utils/format-task-output.ts';
import { getIcon } from '../utils/get-icon.ts';
import { isCI } from '../utils/is-ci.ts';
import { patchConsole } from '../utils/patch-console.ts';
import { areAllTasksDone } from '../utils/task-list.ts';

export const pinned: RendererFactory = (
	taskList: TaskList,
	outputStream: NodeJS.WriteStream,
	theme: TasukuTheme,
): Renderer => {
	let animationFrame = 0;
	let spinnerFrame = 0;
	let spinnerInterval: NodeJS.Timeout | undefined;
	let renderTimeout: NodeJS.Timeout | undefined;
	let lastOutput = '';
	let hasHiddenTasks = false;
	let hasSavedPosition = false;
	let suppressRerender = false;
	let restoreConsole: (() => void) | undefined;

	const isTTY = outputStream.isTTY === true;
	const isInteractive = isTTY && !isCI;

	// Save cursor position at the top of the render area.
	// Called on first render and after each console.log insertion.
	// Runs in all non-CI environments (including non-TTY/piped) to match
	// the old cursor-up clearing behavior which also ran in non-TTY mode.
	const savePosition = () => {
		if (!isCI) {
			outputStream.write(cursorSavePosition);
			hasSavedPosition = true;
		}
	};

	// Restore cursor to saved position and erase everything below.
	// Handles any extra lines (e.g. stdin echo) that appeared since last render.
	const clearRenderArea = () => {
		if (hasSavedPosition) {
			outputStream.write(cursorRestorePosition + eraseDown);
		}
	};

	let maxVisibleOverride: number | ((terminalHeight: number) => number) | undefined;

	// Cache terminal height to avoid reading outputStream.rows on every render.
	// Updated on resize events. Falls back to 24 (VT100 default) in
	// non-TTY environments where outputStream.rows is undefined.
	let terminalHeight = outputStream.rows || 24;

	// Get the visible lines limit (user override or terminal height - 2, minimum 1)
	const getVisibleLinesLimit = (): number => {
		if (maxVisibleOverride !== undefined) {
			const limit = typeof maxVisibleOverride === 'function'
				? maxVisibleOverride(terminalHeight)
				: maxVisibleOverride;
			return Math.max(1, limit);
		}
		return Math.max(5, terminalHeight - 2);
	};

	// Exit handler registered after render() is defined (see below)

	const renderTask = (task: TaskList[number], depth: number): string => {
		const hasChildren = task.children && task.children.length > 0;
		const icon = getIcon(task.state, hasChildren, theme, spinnerFrame);

		let line = `${formatTaskLine(task, icon, depth, theme, animationFrame)}\n`;
		line += formatTaskOutput(task, depth, theme);

		// Render children recursively
		if (hasChildren) {
			line += renderTaskList(task.children, depth + 1);
		}

		return line;
	};

	// Sort tasks by state priority: loading > pending > completed
	const getStatePriority = (state: TaskList[number]['state']): number => {
		if (state === 'loading') { return 0; }
		if (state === 'pending') { return 1; }
		return 2; // success, error, warning, skipped
	};

	let isFinalRender = false;

	const renderTaskList = (tasks: TaskList, depth = 0): string => {
		// Only apply visible lines limit and sorting at root level
		if (depth === 0) {
			// Only skip the limit on the final render (clear/destroy) when
			// no explicit maxVisible was set. During normal renders, we must
			// keep the limit because ANSI cursor movement can't reach lines
			// that scrolled off screen, which would break the next redraw.
			const skipLimit = isFinalRender && maxVisibleOverride === undefined;

			if (skipLimit) {
				hasHiddenTasks = false;
			} else {
				const maxLines = getVisibleLinesLimit();

				// Render in insertion order first
				const renderedTasks = tasks.map(task => renderTask(task, depth));
				const totalOutput = renderedTasks.join('');
				const totalLines = renderedTasks.reduce(
					(count, output) => count + output.split('\n').length - 1,
					0,
				);

				if (totalLines <= maxLines) {
					// Everything fits — no truncation needed
					hasHiddenTasks = false;
					return totalOutput;
				}

				// Truncation needed — sort by state priority so active tasks
				// bubble up and completed tasks are hidden first
				const sortedTasks = [...tasks].sort(
					(a, b) => getStatePriority(a.state) - getStatePriority(b.state),
				);

				let output = '';
				let lineCount = 0;
				let renderedTaskCount = 0;

				for (let i = 0; i < sortedTasks.length; i += 1) {
					const taskOutput = renderTask(sortedTasks[i], depth);
					const taskLines = taskOutput.split('\n').length - 1;
					const hasMoreTasks = i < sortedTasks.length - 1;
					const reservedLines = hasMoreTasks ? 1 : 0;

					if (lineCount + taskLines + reservedLines > maxLines && renderedTaskCount > 0) {
						break;
					}

					output += taskOutput;
					lineCount += taskLines;
					renderedTaskCount += 1;
				}

				const hiddenTasks = sortedTasks.slice(renderedTaskCount);
				hasHiddenTasks = hiddenTasks.length > 0;

				if (hasHiddenTasks) {
					const parts: string[] = [];
					let loading = 0;
					let pending = 0;
					let completed = 0;
					for (const task of hiddenTasks) {
						if (task.state === 'loading') {
							loading += 1;
						} else if (task.state === 'pending') {
							pending += 1;
						} else {
							completed += 1;
						}
					}
					if (loading > 0) { parts.push(`${loading} loading`); }
					if (pending > 0) { parts.push(`${pending} queued`); }
					if (completed > 0) { parts.push(`${completed} completed`); }
					output += `${theme.colors.dim(`(+ ${parts.join(', ')})`)}\n`;
				}

				return output;
			}
		}

		return tasks.map(task => renderTask(task, depth)).join('');
	};

	const consoleHooks = {
		before: () => {
			// Clear task UI from saved position.
			// Must react to ALL console writes (both stdout and stderr)
			// because in a TTY they share the same screen.
			clearRenderArea();
			// Force next render to redraw even if output is identical
			lastOutput = '';
		},
		after: () => {
			// Save new position — render area moves below console output
			savePosition();

			// Immediately re-render the task UI so it stays visible below
			// the console output. Without this, the UI remains erased until
			// the next spinner tick (up to ~113ms), causing visible flicker.
			// Skip if suppressed (all tasks done with truncation — exit handler
			// will do the final unlimited render).
			if (taskList.length > 0 && !suppressRerender) {
				render();
			}
		},
	};

	const startSpinner = () => {
		if (spinnerInterval || !isTTY || isCI) {
			return;
		}
		spinnerInterval = setInterval(() => {
			animationFrame += 1;
			spinnerFrame = animationFrame % theme.spinner.length;
			scheduleRender();
		}, theme.spinnerInterval ?? 80);
		spinnerInterval.unref();
	};

	const render = (final = false) => {
		const output = renderTaskList(taskList);

		// Check if all tasks are done (no loading tasks)
		const allDone = areAllTasksDone(taskList);
		if (allDone && spinnerInterval) {
			// Stop spinner when everything is done
			clearInterval(spinnerInterval);
			spinnerInterval = undefined;
		} else if (!allDone && !spinnerInterval) {
			// Restart spinner if new loading tasks appeared
			startSpinner();
		}

		if (isCI && !final) {
			// CI mode: only write final output when all tasks are done
			// This produces clean append-only output without intermediate states
			if (allDone && output !== lastOutput) {
				outputStream.write(output);
				lastOutput = output;
			}
			return;
		}

		// Skip redraw if output is identical to last frame
		if (output === lastOutput) {
			return;
		}

		clearRenderArea();

		if (!hasSavedPosition) {
			savePosition();
		}

		lastOutput = output;

		// Re-anchor: the output may cause the terminal to scroll, shifting
		// the saved position off-screen. Cursor-up is relative and immune
		// to scroll, so we move back to the start of the render area,
		// re-save, then return to the end.
		//
		// Must count VISUAL lines (accounting for line wraps) not just \n
		// characters — a logical line wider than the terminal wraps to
		// multiple rows, and cursorUp must cover all of them.
		if (isTTY) {
			const columns = outputStream.columns || 80;
			let visualLineCount = 0;
			const lines = output.split('\n');
			for (let i = 0; i < lines.length - 1; i += 1) {
				const width = stringWidth(lines[i]);
				visualLineCount += width <= columns
					? 1
					: Math.ceil(width / columns);
			}
			// Batch: output + re-anchor (cursor-up + save + cursor-down) in one write
			if (visualLineCount > 0) {
				outputStream.write(
					output + cursorUp(visualLineCount) + cursorSavePosition + cursorDown(visualLineCount),
				);
				hasSavedPosition = true;
			} else {
				outputStream.write(output);
			}
		} else {
			outputStream.write(output);
		}
	};

	const scheduleRender = () => {
		// Throttle renders to ~30 FPS (33ms interval)
		// Unlike browsers, terminals don't have requestAnimationFrame.
		// We throttle because:
		// - Each render does I/O (clearing/writing lines)
		// - Too frequent updates cause flickering
		// - 30 FPS is smooth enough for human perception
		if (renderTimeout) {
			return;
		}
		renderTimeout = setTimeout(() => {
			renderTimeout = undefined;
			render();
		}, 33);
	};

	const flushRender = (force = false) => {
		// Clear any pending throttled render and render immediately.
		// In non-interactive mode (piped output, CI), don't paint synchronously
		// per change — defer to the throttled render, which coalesces and (in CI)
		// only writes the final state. `force` (error about to be re-thrown) still
		// renders now, since the process may exit before the deferred render fires.
		if (!force && !isInteractive) {
			scheduleRender();
			return;
		}
		if (renderTimeout) {
			clearTimeout(renderTimeout);
			renderTimeout = undefined;
		}
		render();

		// After all tasks complete with hidden (truncated) tasks,
		// prevent handleConsoleOutput from re-rendering the truncated list
		// (the exit handler will do the final unlimited render instead).
		if (areAllTasksDone(taskList) && hasHiddenTasks) {
			suppressRerender = true;
		}
	};

	// Handle terminal resize: update cached height and re-render
	const handleResize = () => {
		terminalHeight = outputStream.rows || 24;
		// Force redraw — column changes affect visual line wrapping
		// even when the rendered text is identical
		lastOutput = '';
		scheduleRender();
	};

	const destroy = () => {
		process.off('exit', handleExit);
		outputStream.off('resize', handleResize);
		clearInterval(spinnerInterval);
		clearTimeout(renderTimeout);
		restoreConsole?.();

		// Clear all task output before destroying
		clearRenderArea();
		hasSavedPosition = false;
	};

	// On process exit: do a final unlimited render so the complete
	// task list is visible in scrollback, then restore cursor.
	// Only fires when the current output has hidden (truncated) tasks.
	// If all tasks fit (no truncation), the handler does nothing.
	const handleExit = () => {
		if (hasHiddenTasks && areAllTasksDone(taskList)) {
			// Clear maxVisible override so skipLimit works unconditionally
			maxVisibleOverride = undefined;
			isFinalRender = true;
			render();
			isFinalRender = false;
		}
	};

	// Register resize handler
	if (isTTY) {
		outputStream.on('resize', handleResize);
	}

	// Register exit handler
	if (isInteractive) {
		process.on('exit', handleExit);
	}

	// Initialize
	if (!isCI) {
		// Patch console to intercept output (even in non-TTY mode for testing/piping)
		restoreConsole = patchConsole(consoleHooks);

		// Start spinner animation
		startSpinner();
	}

	// Don't do initial render - wait for first state change or console output
	// This prevents showing spinners for fast-completing tasks

	return {
		triggerRender: scheduleRender,
		flushRender,
		renderFinal: () => {
			isFinalRender = true;
			render(true);
			isFinalRender = false;
		},
		destroy,
		setMaxVisible: (limit?: number | ((terminalHeight: number) => number)) => {
			maxVisibleOverride = limit;
		},
	};
};
