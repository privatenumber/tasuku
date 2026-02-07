import patchConsole from 'patch-console';
import {
	cursorUp, cursorShow, eraseLine,
} from 'ansi-escapes';
import {
	green, red, yellow, gray, dim,
} from 'yoctocolors';
import type { TaskList } from './types.js';
import { getVisualLineCount } from './utils/visual-line-count.js';
import { formatElapsed } from './utils/format-elapsed.js';
import { areAllTasksDone } from './utils/task-list.js';

const SPINNER_FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

// Simple CI detection (inline instead of is-in-ci dependency)
// Only enable CI mode if explicitly in CI environment, not just !isTTY
const isCI = Boolean(
	process.env.CI
	|| process.env.CONTINUOUS_INTEGRATION
	|| process.env.BUILD_NUMBER,
);

// Color detection with proper precedence:
// 1. NO_COLOR and NODE_DISABLE_COLORS always disable (highest priority)
// 2. Use Node's built-in hasColors() if available
// 3. Check FORCE_COLOR explicitly
// 4. Default to TTY status
const detectColors = (stdout: NodeJS.WriteStream): boolean => {
	if (process.env.NO_COLOR || process.env.NODE_DISABLE_COLORS) {
		return false;
	}

	if (stdout.hasColors) {
		return stdout.hasColors();
	}

	if (process.env.FORCE_COLOR !== undefined) {
		// FORCE_COLOR=0 disables, any other value enables
		return process.env.FORCE_COLOR !== '0';
	}

	// Default: use colors only if explicitly TTY
	return stdout.isTTY === true;
};

const colorize = (
	useColors: boolean,
	colorFunction: (text: string) => string,
	text: string,
): string => (
	useColors
		? colorFunction(text)
		: text
);

export type Renderer = {
	triggerRender: () => void;
	flushRender: () => void;
	renderFinal: () => void;
	destroy: () => void;
	setMaxVisible: (limit?: number | ((terminalHeight: number) => number)) => void;
};

export const createRenderer = (
	taskList: TaskList,
	stdout: NodeJS.WriteStream = process.stdout,
): Renderer => {
	let spinnerFrame = 0;
	let spinnerInterval: NodeJS.Timeout | undefined;
	let renderTimeout: NodeJS.Timeout | undefined;
	let lastOutput = '';
	let lastLineCount = 0;
	let hasHiddenTasks = false;
	let restoreConsole: (() => void) | undefined;
	let cursorHidden = false;

	const isTTY = stdout.isTTY === true;
	const useColors = detectColors(stdout);
	const isInteractive = isTTY && !isCI;

	let maxVisibleOverride: number | ((terminalHeight: number) => number) | undefined;

	// Cache terminal height to avoid reading stdout.rows on every render.
	// Updated on resize events. Falls back to 24 (VT100 default) in
	// non-TTY environments where stdout.rows is undefined.
	let terminalHeight = stdout.rows || 24;

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
			stdout.write(cursorShow);
			cursorHidden = false;
		}
	};

	// Exit handler registered after render() is defined (see below)

	const getIcon = (state: TaskList[number]['state'], hasChildren: boolean): string => {
		if (state === 'pending') {
			return colorize(useColors, gray, '◼');
		}

		if (state === 'loading') {
			// Parent tasks with children show yellow pointer while loading
			if (hasChildren) {
				return colorize(useColors, yellow, '❯');
			}
			return colorize(useColors, yellow, SPINNER_FRAMES[spinnerFrame]);
		}

		if (state === 'success') {
			// Parent tasks with children show yellow pointer
			if (hasChildren) {
				return colorize(useColors, yellow, '❯');
			}
			return colorize(useColors, green, '✔');
		}

		if (state === 'error') {
			// Parent tasks with children show red pointer
			if (hasChildren) {
				return colorize(useColors, red, '❯');
			}
			return colorize(useColors, red, '✖');
		}

		if (state === 'warning') {
			return colorize(useColors, yellow, '⚠');
		}

		return colorize(useColors, gray, '◼');
	};

	const renderTask = (task: TaskList[number], depth: number): string => {
		const indent = '  '.repeat(depth);
		const hasChildren = task.children && task.children.length > 0;
		const icon = getIcon(task.state, hasChildren);

		let line = `${indent}${icon} ${task.title}`;
		if (task.status) {
			const styledStatus = useColors
				? dim(`[${task.status}]`)
				: `[${task.status}]`;
			line += ` ${styledStatus}`;
		}

		// Add elapsed time if timer is active or frozen
		const elapsedMs = task.elapsedMs ?? (
			task.startedAt === undefined
				? undefined
				: Date.now() - task.startedAt
		);
		if (elapsedMs !== undefined && elapsedMs >= 1000) {
			const styledTime = useColors
				? dim(formatElapsed(elapsedMs))
				: formatElapsed(elapsedMs);
			line += ` ${styledTime}`;
		}

		line += '\n';

		if (task.output) {
			const outputIndent = `${indent}  `;
			const styleText = (text: string) => (useColors
				? gray(text)
				: text);

			line += `${task.output
				.split('\n')
				.map((outputLine, index) => `${outputIndent}${styleText(index === 0 ? `→ ${outputLine}` : outputLine)}`)
				.join('\n')}\n`;
		}

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
			// Sort by state: loading first, then pending, then completed
			const sortedTasks = [...tasks].sort(
				(a, b) => getStatePriority(a.state) - getStatePriority(b.state),
			);

			// Only skip the limit on the final render (clear/destroy) when
			// no explicit maxVisible was set. During normal renders, we must
			// keep the limit because ANSI cursor movement can't reach lines
			// that scrolled off screen, which would break the next redraw.
			const skipLimit = isFinalRender && maxVisibleOverride === undefined;

			if (!skipLimit) {
				const maxLines = getVisibleLinesLimit();
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
					const hiddenText = `(+ ${parts.join(', ')})`;
					const styledHiddenText = useColors ? dim(hiddenText) : hiddenText;
					output += `${styledHiddenText}\n`;
				}

				return output;
			}

			hasHiddenTasks = false;
			return sortedTasks.map(task => renderTask(task, depth)).join('');
		}

		return tasks.map(task => renderTask(task, depth)).join('');
	};

	const handleConsoleOutput = (_stream: 'stdout' | 'stderr', data: string) => {
		// Clear our task UI output
		if (lastLineCount > 0) {
			for (let i = 0; i < lastLineCount; i += 1) {
				stdout.write(eraseLine);
				stdout.write(cursorUp());
			}
			// Erase the final line we're now on and move cursor to column 0
			stdout.write(eraseLine);
			stdout.write('\u001B[G'); // Cursor to column 0
			lastLineCount = 0; // Reset so we don't clear console output next time
		}

		// Write console output to stdout (both stdout and stderr)
		// We write all intercepted console output to the renderer's stdout
		// to keep it synchronized with the task UI
		stdout.write(data);

		// After console output, either re-render task UI or write placeholder
		if (taskList.length > 0) {
			// Only re-render if:
			// 1. All tasks are done (no more state changes expected)
			// 2. There's been an actual render (not just a placeholder)
			// This fixes console.log after task completion overwriting the task,
			// while preserving existing behavior during/between task execution
			if (areAllTasksDone(taskList) && lastOutput !== '\n') {
				render();
			} else {
				// During task execution or between tasks, use placeholder
				stdout.write('\n');
				lastOutput = '\n';
				lastLineCount = 1;
			}
		}
	};

	const startSpinner = () => {
		if (spinnerInterval || !isTTY || isCI) {
			return;
		}
		spinnerInterval = setInterval(() => {
			spinnerFrame = (spinnerFrame + 1) % SPINNER_FRAMES.length;
			scheduleRender();
		}, 80);
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
				stdout.write(output);
				lastOutput = output;
			}
			return;
		}

		// Clear previous output (same logic as handleConsoleOutput)
		if (lastLineCount > 0) {
			for (let i = 0; i < lastLineCount; i += 1) {
				stdout.write(eraseLine);
				stdout.write(cursorUp());
			}
			// Erase the final line we're now on and move cursor to column 0
			stdout.write(eraseLine);
			stdout.write('\u001B[G'); // Cursor to column 0
		}

		// Write new output
		stdout.write(output);
		lastOutput = output;
		lastLineCount = getVisualLineCount(output, stdout.columns);
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
		// subsequent stdout writes
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
		terminalHeight = stdout.rows || 24;
		scheduleRender();
	};

	const destroy = () => {
		// Remove exit handler to prevent memory leaks
		if (isInteractive) {
			process.off('exit', handleExit);
		}

		// Remove resize handler
		if (isTTY) {
			stdout.off('resize', handleResize);
		}

		if (spinnerInterval) {
			clearInterval(spinnerInterval);
		}

		if (renderTimeout) {
			clearTimeout(renderTimeout);
		}

		if (restoreConsole) {
			restoreConsole();
		}

		// Clear all task output before destroying
		if (isInteractive && lastLineCount > 0) {
			for (let i = 0; i < lastLineCount; i += 1) {
				stdout.write(eraseLine);
				stdout.write(cursorUp());
			}
		}

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
		stdout.on('resize', handleResize);
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
