import patchConsole from 'patch-console';
import {
	cursorUp, cursorHide, cursorShow, eraseLine,
} from 'ansi-escapes';
import {
	green, red, yellow, gray, dim,
} from 'yoctocolors';
import type { TaskList } from './types.js';

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

const areAllTasksDone = (tasks: TaskList): boolean => {
	for (const task of tasks) {
		if (task.state === 'loading' || task.state === 'pending') {
			return false;
		}
		if (task.children && task.children.length > 0 && !areAllTasksDone(task.children)) {
			return false;
		}
	}
	return true;
};

export type Renderer = {
	triggerRender: () => void;
	renderFinal: () => void;
	destroy: () => void;
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
	let restoreConsole: (() => void) | undefined;
	let cursorHidden = false;

	const isTTY = stdout.isTTY === true; // Only true counts as TTY
	const useColors = detectColors(stdout);

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

	const renderTaskList = (tasks: TaskList, depth = 0) => tasks.map(task => renderTask(task, depth)).join('');

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

		// Always render an empty line after console output
		// This ensures console output doesn't get mixed with task UI
		// and provides a placeholder for the next console output to clear
		if (taskList.length > 0) {
			stdout.write('\n');
			lastOutput = '\n';
			lastLineCount = 1;
		}
	};

	const render = (final = false) => {
		const output = renderTaskList(taskList);

		// Check if all tasks are done (no loading tasks)
		const allDone = areAllTasksDone(taskList);
		if (allDone && spinnerInterval) {
			// Stop spinner when everything is done
			clearInterval(spinnerInterval);
			spinnerInterval = undefined;
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

		// Hide cursor only when rendering loading/pending tasks (spinner states)
		// Don't hide for completed tasks or empty lines
		if (!cursorHidden && isTTY && output !== '' && output !== '\n' && !allDone) {
			stdout.write(cursorHide);
			cursorHidden = true;
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
		lastLineCount = output.split('\n').length - 1;
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

	const destroy = () => {
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
		if (!isCI && isTTY && lastLineCount > 0) {
			for (let i = 0; i < lastLineCount; i += 1) {
				stdout.write(eraseLine);
				stdout.write(cursorUp());
			}
		}

		if (!isCI && isTTY) {
			// Show cursor
			stdout.write(cursorShow);
		}
	};

	// Initialize
	if (!isCI) {
		// Patch console to intercept output (even in non-TTY mode for testing/piping)
		restoreConsole = patchConsole(handleConsoleOutput);

		if (isTTY) {
			// Start spinner animation (80ms interval like Ink)
			spinnerInterval = setInterval(() => {
				spinnerFrame = (spinnerFrame + 1) % SPINNER_FRAMES.length;
				scheduleRender();
			}, 80);
			// Don't keep process alive just for spinner animation
			spinnerInterval.unref();
		}
	}

	// Don't do initial render - wait for first state change or console output
	// This prevents showing spinners for fast-completing tasks

	return {
		triggerRender: scheduleRender,
		renderFinal: () => render(true),
		destroy,
	};
};
