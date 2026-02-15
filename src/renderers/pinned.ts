import {
	cursorUp, cursorDown, cursorShow,
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
	let restoreConsole: (() => void) | undefined;
	let cursorHidden = false;

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

	// Restore cursor - used by exit handlers and destroy()
	const restoreCursor = () => {
		if (cursorHidden) {
			outputStream.write(cursorShow);
			cursorHidden = false;
		}
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
		return 2; // success, error, warning
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

				// Sort by state only when truncation is needed — preserves
				// insertion order so active tasks bubble up only when some
				// tasks must be hidden.
				const sortedTasks = [...tasks].sort(
					(a, b) => getStatePriority(a.state) - getStatePriority(b.state),
				);

				let output = '';
				let lineCount = 0;
				let renderedTaskCount = 0;

				for (let i = 0; i < sortedTasks.length; i += 1) {
					const taskOutput = renderTask(sortedTasks[i], depth);
					const taskLines = taskOutput.split('\n').length - 1; // -1 because split creates extra empty element
					const hasMoreTasks = i < sortedTasks.length - 1;

					// Reserve 1 line for the "(X more tasks)" summary if there are more
					const reservedLines = hasMoreTasks ? 1 : 0;

					// Check if adding this task would exceed the limit
					// Always show at least one task
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
					return output;
				}
			}
		}

		return tasks.map(task => renderTask(task, depth)).join('');
	};

	const handleConsoleOutput = (stream: 'stdout' | 'stderr', data: string) => {
		// Clear task UI from saved position
		clearRenderArea();

		// Write to the original stream (not the renderer's output stream)
		// so console.log → stdout and console.error → stderr
		const target = stream === 'stderr' ? process.stderr : process.stdout;
		target.write(data);

		// Save new position — render area moves below console output
		savePosition();

		// After console output, either re-render task UI or mark idle.
		// No placeholder '\n' is needed — save/restore anchors the
		// render area without line-count tracking.
		if (taskList.length > 0) {
			if (areAllTasksDone(taskList) && lastOutput !== '\n') {
				render();
			} else {
				lastOutput = '\n';
			}
		}
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
			if (areAllTasksDone(taskList) && output !== lastOutput) {
				outputStream.write(output);
				lastOutput = output;
			}
			return;
		}

		clearRenderArea();

		if (!hasSavedPosition) {
			savePosition();
		}

		// Write new output
		outputStream.write(output);
		lastOutput = output;

		// Re-anchor: the output above may have caused the terminal to
		// scroll, shifting the saved position off-screen.  Cursor-up is
		// relative and immune to scroll, so we move back to the start of
		// the render area, re-save, then return to the end.
		//
		// Must count VISUAL lines (accounting for line wraps) not just \n
		// characters — a logical line wider than the terminal wraps to
		// multiple rows, and cursorUp must cover all of them.
		if (isTTY) {
			const columns = outputStream.columns || 80;
			let visualLineCount = 0;
			// Split on \n; the trailing \n produces an empty last element — skip it
			const lines = output.split('\n');
			for (let i = 0; i < lines.length - 1; i += 1) {
				const width = stringWidth(lines[i]);
				visualLineCount += width <= columns
					? 1
					: Math.ceil(width / columns);
			}
			if (visualLineCount > 0) {
				outputStream.write(cursorUp(visualLineCount));
				savePosition();
				outputStream.write(cursorDown(visualLineCount));
			}
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

	const flushRender = () => {
		// Clear any pending throttled render and render immediately
		// Used when task reaches terminal state to prevent overwriting
		// subsequent output writes
		// Only needed in interactive mode (TTY with ANSI clearing)
		if (!isInteractive) {
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
			lastOutput = '\n';
		}
	};

	// Handle terminal resize: update cached height and re-render
	const handleResize = () => {
		terminalHeight = outputStream.rows || 24;
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

		// Restore cursor
		restoreCursor();
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
		restoreCursor();
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
		restoreConsole = patchConsole(handleConsoleOutput);

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
