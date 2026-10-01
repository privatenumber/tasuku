import {
	cursorUp, cursorDown,
	cursorSavePosition, cursorRestorePosition, eraseDown,
} from 'ansi-escapes';
import stripAnsi from 'strip-ansi';
import { cachedStringWidth } from '../utils/cached-string-width.ts';
import { countNewlines } from '../utils/count-newlines.ts';
import { truncateLine } from '../utils/truncate-line.ts';
import { colors, spinner, spinnerInterval as spinnerIntervalMs } from '../style.ts';
import type {
	Renderer, RendererFactory, TaskList, TaskObject,
} from '../types.ts';
import { formatTaskLine } from '../utils/format-task-line.ts';
import { formatTaskOutput } from '../utils/format-task-output.ts';
import { getIcon } from '../utils/get-icon.ts';
import { isCI } from '../utils/is-ci.ts';
import { patchConsole } from '../utils/patch-console.ts';
import { interceptStream, type StreamController } from '../utils/intercept-stream.ts';
import { getSiblingStream } from '../utils/sibling-stream.ts';
import { areAllTasksDone } from '../utils/task-list.ts';

const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

// Close OSC 8 hyperlinks and reset SGR styling so clipped output cannot leak state.
// https://gist.github.com/egmontkob/eb114294efbcd5adb1944c9f3cb5feda#the-escape-sequence
const closeClippedAnsiState = '\u001B]8;;\u001B\\\u001B[0m';

const countRows = (output: string, columns: number): number => {
	let rows = 0;
	const lines = output.split('\n');
	for (let index = 0; index < lines.length - 1; index += 1) {
		rows += 1;
		if (cachedStringWidth(lines[index]) <= columns) {
			continue;
		}
		let column = 0;
		for (const { segment } of graphemes.segment(stripAnsi(lines[index]))) {
			const width = cachedStringWidth(segment);
			// Wide characters wrap before the margin when only one cell remains.
			// An exact-width line wraps only when another visible character arrives.
			if (width > 0 && column + width > columns) {
				rows += 1;
				column = 0;
			}
			column += width;
		}
	}
	return rows;
};

// Keep the leading logical lines of an oversized task, clipping its last line
// to the remaining rows. Close hyperlinks and reset styling at a clipped boundary.
const clipRows = (output: string, rows: number, columns: number): string => {
	let clipped = '';
	for (const line of output.split('\n').slice(0, -1)) {
		if (rows <= 0) {
			break;
		}
		const lineRows = countRows(`${line}\n`, columns);
		if (lineRows > rows) {
			let column = 0;
			let widthLimit = 0;
			for (const { segment } of graphemes.segment(stripAnsi(line))) {
				const width = cachedStringWidth(segment);
				if (width > 0 && column + width > columns) {
					rows -= 1;
					if (rows === 0) {
						break;
					}
					column = 0;
				}
				column += width;
				widthLimit += width;
			}
			clipped += `${truncateLine(line, widthLimit)}\n`;
			break;
		}
		clipped += `${line}\n`;
		rows -= lineRows;
	}
	return clipped === output || clipped === ''
		? clipped
		: `${clipped.slice(0, -1)}${closeClippedAnsiState}\n`;
};

const hiddenTaskSummary = (loading: number, pending: number, completed: number): string => {
	const parts: string[] = [];
	if (loading > 0) {
		parts.push(`${loading} loading`);
	}
	if (pending > 0) {
		parts.push(`${pending} queued`);
	}
	if (completed > 0) {
		parts.push(`${completed} completed`);
	}
	return parts.length > 0 ? `${colors.dim(`(+ ${parts.join(', ')})`)}\n` : '';
};

export const pinned: RendererFactory = (
	taskList: TaskList,
	outputStream: NodeJS.WriteStream,
): Renderer => {
	let animationFrame = 0;
	let spinnerFrame = 0;
	let spinnerInterval: NodeJS.Timeout | undefined;
	let renderTimeout: NodeJS.Timeout | undefined;
	let lastOutput = '';
	let hasHiddenTasks = false;
	let hasSavedPosition = false;
	let suppressRerender = false;

	const isTTY = outputStream.isTTY === true;
	const isInteractive = isTTY && !isCI;

	// Coordinate the render area with other terminal output: console.* via
	// patchConsole, raw stream writes via interceptStream. Registered in non-CI
	// mode; in CI there's no pinned area to protect, so writes go direct.
	let restoreConsole: (() => void) | undefined;
	let streamController: StreamController | undefined;
	let siblingController: StreamController | undefined;

	// Write the renderer's own output. Through the controller it's marked as our
	// own (so our hooks don't react to it), while any other renderer on the same
	// stream still sees it.
	const write = (data: string) => {
		if (streamController) {
			streamController.write(data);
		} else {
			outputStream.write(data);
		}
	};

	// Save cursor position at the top of the render area.
	// Called on first render and after each console.log insertion.
	// Runs in all non-CI environments (including non-TTY/piped) to match
	// the old cursor-up clearing behavior which also ran in non-TTY mode.
	const savePosition = () => {
		if (!isCI) {
			write(cursorSavePosition);
			hasSavedPosition = true;
		}
	};

	// Restore cursor to saved position and erase everything below.
	// Handles any extra lines (e.g. stdin echo) that appeared since last render.
	const clearRenderArea = () => {
		if (hasSavedPosition) {
			write(cursorRestorePosition + eraseDown);
		}
	};

	let maxVisibleOverride: number | ((terminalHeight: number) => number) | undefined;

	// Cache terminal height to avoid reading outputStream.rows on every render.
	// Updated on resize events. Falls back to 24 (VT100 default) in
	// non-TTY environments where outputStream.rows is undefined.
	let terminalHeight = outputStream.rows || 24;

	// Leave two rows for the trailing newline and cursor. User limits cannot
	// enlarge an interactive frame beyond the viewport.
	const getVisibleLinesLimit = (): number => {
		const viewportLimit = Math.max(0, terminalHeight - 2);
		if (maxVisibleOverride !== undefined) {
			const limit = typeof maxVisibleOverride === 'function'
				? maxVisibleOverride(terminalHeight)
				: maxVisibleOverride;
			return isInteractive
				? Math.min(viewportLimit, Math.max(1, Math.floor(limit)))
				: Math.max(1, Math.floor(limit));
		}
		return isInteractive ? viewportLimit : Math.max(5, terminalHeight - 2);
	};

	// Exit handler registered after render() is defined (see below)

	const renderTask = (task: TaskList[number], depth: number): string => {
		const hasChildren = task.children && task.children.length > 0;
		const icon = getIcon(task.state, hasChildren, spinnerFrame);

		let line = `${formatTaskLine(task, icon, depth)}\n`;
		line += formatTaskOutput(task, depth);
		// Normalize internal escapes before measuring or emitting whole graphemes.
		if (isInteractive) {
			line = truncateLine(line, Infinity);
		}

		// Render children recursively
		if (hasChildren) {
			line += renderTaskList(task.children, depth + 1);
		}

		return line;
	};

	let isFinalRender = false;

	const renderTaskList = (tasks: TaskList, depth = 0): string => {
		if (depth > 0) {
			return tasks.map(task => renderTask(task, depth)).join('');
		}

		// Final output can enter scrollback because it will not be redrawn.
		if (isFinalRender && maxVisibleOverride === undefined) {
			hasHiddenTasks = false;
			return tasks.map(task => renderTask(task, depth)).join('');
		}

		const maxLines = getVisibleLinesLimit();
		const columns = outputStream.columns || 80;

		// Preserve insertion order when everything fits. Stop at overflow because
		// the prioritized pass renders only the visible subset.
		const renderedTasks: string[] = [];
		let totalLines = 0;
		for (const task of tasks) {
			const taskOutput = renderTask(task, depth);
			renderedTasks.push(taskOutput);
			totalLines += isInteractive ? countRows(taskOutput, columns) : countNewlines(taskOutput);
			if (totalLines > maxLines) {
				break;
			}
		}

		if (totalLines <= maxLines) {
			hasHiddenTasks = false;
			return renderedTasks.join('');
		}

		// Keep active tasks visible first, preserving order within each priority.
		const loadingTasks: TaskObject[] = [];
		const pendingTasks: TaskObject[] = [];
		const completedTasks: TaskObject[] = [];
		for (const task of tasks) {
			if (task.state === 'loading') {
				loadingTasks.push(task);
			} else if (task.state === 'pending') {
				pendingTasks.push(task);
			} else {
				completedTasks.push(task);
			}
		}
		const sortedTasks = [...loadingTasks, ...pendingTasks, ...completedTasks];

		let output = '';
		let lineCount = 0;
		let renderedTaskCount = 0;
		let hasClippedTask = false;
		let loading = loadingTasks.length;
		let pending = pendingTasks.length;
		let completed = completedTasks.length;
		let summary = hiddenTaskSummary(loading, pending, completed);

		for (const task of sortedTasks) {
			if (task.state === 'loading') {
				loading -= 1;
			} else if (task.state === 'pending') {
				pending -= 1;
			} else {
				completed -= 1;
			}
			const nextSummary = hiddenTaskSummary(loading, pending, completed);
			const taskOutput = renderTask(task, depth);
			const taskLines = isInteractive ? countRows(taskOutput, columns) : countNewlines(taskOutput);
			const reservedLines = isInteractive
				? countRows(nextSummary, columns)
				: countNewlines(nextSummary);

			if (lineCount + taskLines + reservedLines > maxLines && renderedTaskCount > 0) {
				break;
			}

			const availableRows = Math.max(0, maxLines - lineCount - reservedLines);
			if (isInteractive && availableRows === 0) {
				break;
			}
			hasClippedTask ||= isInteractive && taskLines > availableRows;
			output += isInteractive && taskLines > availableRows
				? clipRows(taskOutput, availableRows, columns)
				: taskOutput;
			lineCount += isInteractive ? Math.min(taskLines, availableRows) : taskLines;
			renderedTaskCount += 1;
			summary = nextSummary;
		}

		hasHiddenTasks = renderedTaskCount < sortedTasks.length || hasClippedTask;
		if (hasHiddenTasks) {
			output += isInteractive ? clipRows(summary, maxLines - lineCount, columns) : summary;
		}
		return output;
	};

	const outputHooks = {
		before: () => {
			// Clear task UI from the saved position so other output (console.*,
			// raw stream writes, child stdio) lands above the render area instead
			// of being erased by the next redraw. Reacts to both streams because
			// in a TTY they share the same screen.
			clearRenderArea();
			// Force next render to redraw even if output is identical
			lastOutput = '';
		},
		after: () => {
			// Save new position — render area moves below the other output
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
			spinnerFrame = animationFrame % spinner.length;
			scheduleRender();
		}, spinnerIntervalMs);
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
				write(output);
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
			const visualLineCount = countRows(output, columns);
			// Batch: output + re-anchor (cursor-up + save + cursor-down) in one write
			if (visualLineCount > 0) {
				write(
					output + cursorUp(visualLineCount) + cursorSavePosition + cursorDown(visualLineCount),
				);
				hasSavedPosition = true;
			} else {
				write(output);
			}
		} else {
			write(output);
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

		// Clear all task output before destroying (while still registered, so
		// any other renderer on the same stream sees it), then stop intercepting.
		clearRenderArea();
		hasSavedPosition = false;

		streamController?.restore();
		streamController = undefined;
		siblingController?.restore();
		siblingController = undefined;
		restoreConsole?.();
		restoreConsole = undefined;
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
		// Coordinate console.* and raw stream writes with the pinned render area
		// (even in non-TTY mode for testing/piping). patchConsole first, so its
		// console output bypasses the raw interceptor wrapped below.
		//
		// console.* is always genuine external output, so react to all of it. For
		// raw writes, react only to genuine external output (fromPeer false):
		// re-rendering in response to another renderer's writes on a shared stream
		// would cascade, and that scenario is unsupported anyway.
		const rawHooks = {
			before: (_data: string, fromPeer: boolean) => {
				if (!fromPeer) {
					outputHooks.before();
				}
			},
			after: (_data: string, fromPeer: boolean) => {
				if (!fromPeer) {
					outputHooks.after();
				}
			},
		};

		restoreConsole = patchConsole(outputHooks);
		streamController = interceptStream(outputStream, rawHooks);

		// In a shared TTY, stdout and stderr move the same cursor, so a raw write
		// to the sibling stream disturbs the render area too. Watch it the same way
		// patchConsole already accounts for both streams.
		const siblingStream = getSiblingStream(outputStream);
		if (siblingStream) {
			siblingController = interceptStream(siblingStream, rawHooks);
		}

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
