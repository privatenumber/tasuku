import type {
	Renderer, RendererFactory, TaskList, TaskObject, TasukuTheme,
} from '../types.ts';
import { formatTaskLine } from '../utils/format-task-line.ts';
import { formatTaskOutput } from '../utils/format-task-output.ts';
import { getIcon } from '../utils/get-icon.ts';
import { isCI } from '../utils/is-ci.ts';
import { patchConsole } from '../utils/patch-console.ts';
import { areAllTasksDone, isTerminalState } from '../utils/task-list.ts';
import { truncateLine } from '../utils/truncate-line.ts';

const countNewlines = (text: string): number => {
	let count = 0;
	for (let index = 0; index < text.length; index += 1) {
		if (text[index] === '\n') {
			count += 1;
		}
	}
	return count;
};

type TrackedLine = {
	offset: number; // 1-based: lines from cursor rest position
	depth: number;
	outputWritten: boolean;
};

export const inline: RendererFactory = (
	taskList: TaskList,
	outputStream: NodeJS.WriteStream,
	theme: TasukuTheme,
): Renderer => {
	const isTTY = outputStream.isTTY === true;
	const isInteractive = isTTY && !isCI;

	let animationFrame = 0;
	let spinnerFrame = 0;
	let spinnerInterval: NodeJS.Timeout | undefined;
	let restoreConsole: (() => void) | undefined;
	let maxVisibleLimit: number | undefined;

	// Each task line is tracked by its offset from the cursor rest position (1-based)
	const trackedLines = new Map<TaskObject, TrackedLine>();

	// Non-TTY: tracks which tasks have already been written (append-only)
	const committedTasks = new WeakSet<TaskObject>();

	// Write output/streamOutput for a completed task and return lines written.
	const writeTaskOutput = (task: TaskObject, depth: number): number => {
		const output = formatTaskOutput(task, depth, theme);
		if (output) {
			outputStream.write(output);
			return countNewlines(output);
		}
		return 0;
	};

	// --- TTY: Individual line tracking ---

	const getLine = (task: TaskObject, depth: number) => {
		const icon = getIcon(task.state, task.children.length > 0, theme, spinnerFrame);
		return formatTaskLine(task, icon, depth, theme, animationFrame);
	};

	// Increment tracked offsets by count. Only offsets >= minOffset are affected.
	const incrementOffsets = (count: number, minOffset = 1) => {
		for (const [, tracked] of trackedLines) {
			if (tracked.offset >= minOffset) {
				tracked.offset += count;
			}
		}
	};

	// Append a new task line at cursor rest (bottom of all tracked content)
	const appendLineAtRest = (task: TaskObject, depth: number) => {
		const columns = outputStream.columns || 80;
		incrementOffsets(1);
		outputStream.write(`${truncateLine(getLine(task, depth), columns - 1)}\n`);
		trackedLines.set(task, {
			offset: 1,
			depth,
			outputWritten: false,
		});
	};

	// Insert a new task line after a reference offset using CSI L (Insert Line).
	// Used for child tasks that need to appear below their parent, not at cursor rest.
	//
	// Given afterOffset N (the parent/last sibling's offset from rest):
	//   - Lines at offset >= N shift +1 (they're now further from rest)
	//   - New line gets offset N (directly below the reference)
	//   - Cursor rest moves down 1 physical row
	const insertLineAfterOffset = (task: TaskObject, depth: number, afterOffset: number) => {
		const columns = outputStream.columns || 80;
		const maxOffset = (outputStream.rows || 24) - 1;

		// If the insertion point is off-screen, fall back to append at rest
		if (afterOffset - 1 > maxOffset) {
			appendLineAtRest(task, depth);
			return;
		}

		const truncated = truncateLine(getLine(task, depth), columns - 1);
		incrementOffsets(1, afterOffset);

		// CSI L inserts a blank line at cursor, pushing everything below down.
		// Move up to the row below the reference (where the next sibling is),
		// insert, write content, then return to the new rest position.
		const moveUp = afterOffset - 1;
		let buffer = '';
		if (moveUp > 0) {
			buffer += `\u001B[${moveUp}A`;
		}
		buffer += `\u001B[L${truncated}\u001B[${afterOffset}B\r`;

		outputStream.write(buffer);
		trackedLines.set(task, {
			offset: afterOffset,
			depth,
			outputWritten: false,
		});
	};

	// Update a tracked line in-place via cursor-up/down
	const updateLineInPlace = (tracked: TrackedLine, content: string) => {
		const maxOffset = (outputStream.rows || 24) - 1;
		if (tracked.offset > maxOffset) {
			// Task scrolled off screen — can't reach it
			return;
		}
		outputStream.write(`\u001B[${tracked.offset}A\r\u001B[2K${content}\u001B[${tracked.offset}B\r`);
	};

	// Count tasks that are actively displayed (tracked but not yet completed)
	const countActiveTasks = (): number => {
		let count = 0;
		for (const [, tracked] of trackedLines) {
			if (!tracked.outputWritten) {
				count += 1;
			}
		}
		return count;
	};

	// Walk the task list, write initial lines for new loading tasks,
	// and commit completed tasks.
	//
	// insertAfterOffset: when provided, new tasks are inserted after this offset
	// using CSI L instead of appending at cursor rest. Used for child tasks.
	// Returns the lowest offset in this subtree (for chaining child inserts).
	const processTaskList = (
		tasks: TaskList | TaskObject[],
		depth: number,
		insertAfterOffset?: number,
	): number | undefined => {
		const columns = outputStream.columns || 80;

		// Insert mode: when insertAfterOffset is provided, we're processing
		// children and new tasks use CSI L to insert after their parent/sibling.
		const isInsertMode = insertAfterOffset !== undefined;
		let lastSubtreeBottom = insertAfterOffset;

		for (const task of tasks) {
			if (task.state === 'pending') {
				continue;
			}

			let tracked = trackedLines.get(task);

			if (!tracked) {
				// Defer writing if maxVisible limit is reached
				if (maxVisibleLimit !== undefined && countActiveTasks() >= maxVisibleLimit) {
					continue;
				}

				if (isInsertMode) {
					// Child task: insert after parent/previous sibling
					insertLineAfterOffset(task, depth, lastSubtreeBottom!);
				} else {
					// Root task: append at cursor rest
					appendLineAtRest(task, depth);
				}
				tracked = trackedLines.get(task)!;
			}

			// Track subtree bottom for sequential child insertion
			let currentBottom = tracked.offset;

			// Process children — they insert after this task's line
			if (task.children.length > 0) {
				const childBottom = processTaskList(task.children, depth + 1, tracked.offset);
				if (childBottom !== undefined) {
					currentBottom = childBottom;
				}
			}

			if (isInsertMode) {
				lastSubtreeBottom = currentBottom;
			}

			const isDone = isTerminalState(task.state);

			if (isDone && !tracked.outputWritten) {
				// Task just completed — update line with final icon
				updateLineInPlace(tracked, truncateLine(getLine(task, tracked.depth), columns - 1));

				// Write output at cursor rest position
				const linesWritten = writeTaskOutput(task, tracked.depth);
				if (linesWritten > 0) {
					incrementOffsets(linesWritten);
				}
				tracked.outputWritten = true;
			} else if (!isDone && tracked.outputWritten) {
				// Task reverted to loading (setError/setWarning false)
				tracked.outputWritten = false;
			}
		}

		return isInsertMode ? lastSubtreeBottom : undefined;
	};

	// Batched spinner frame update for all tracked loading tasks
	const renderSpinnerFrames = () => {
		const columns = outputStream.columns || 80;
		const maxOffset = (outputStream.rows || 24) - 1;
		let buffer = '';

		for (const [task, tracked] of trackedLines) {
			if (tracked.outputWritten || task.state !== 'loading' || tracked.offset > maxOffset) {
				continue;
			}

			const truncated = truncateLine(getLine(task, tracked.depth), columns - 1);
			buffer += `\u001B[${tracked.offset}A\r\u001B[2K${truncated}\u001B[${tracked.offset}B\r`;
		}

		if (buffer) {
			outputStream.write(buffer);
		}
	};

	const renderTTY = () => {
		processTaskList(taskList, 0);
		renderSpinnerFrames();
	};

	// --- Non-TTY / CI: append-only ---

	const commitDoneTasksNonTTY = (tasks: TaskList | TaskObject[], depth: number) => {
		for (const task of tasks) {
			if (committedTasks.has(task)) {
				continue;
			}

			if (!isTerminalState(task.state)) {
				continue;
			}

			committedTasks.add(task);

			// No truncation — piped/CI output should not be clipped to terminal width
			outputStream.write(`${getLine(task, depth)}\n`);

			// Children
			if (task.children.length > 0) {
				commitDoneTasksNonTTY(task.children, depth + 1);
			}

			writeTaskOutput(task, depth);
		}
	};

	// --- Render dispatch ---

	const render = () => {
		if (isInteractive) {
			renderTTY();
		} else {
			commitDoneTasksNonTTY(taskList, 0);
		}
	};

	// --- Console output handler ---

	const handleConsoleOutput = (stream: 'stdout' | 'stderr', data: string) => {
		const target = stream === 'stderr' ? process.stderr : process.stdout;
		target.write(data);

		// Count newlines and increment all tracked offsets
		if (isInteractive) {
			const newlineCount = countNewlines(data);
			if (newlineCount > 0) {
				incrementOffsets(newlineCount);
			}
		}
	};

	restoreConsole = patchConsole(handleConsoleOutput);

	// --- Spinner ---

	const startSpinner = () => {
		if (spinnerInterval || !isInteractive) {
			return;
		}
		spinnerInterval = setInterval(() => {
			animationFrame += 1;
			spinnerFrame = animationFrame % theme.spinner.length;
			renderSpinnerFrames();
		}, theme.spinnerInterval ?? 80);
		spinnerInterval.unref();
	};

	const renderAndManageSpinner = () => {
		render();

		if (!areAllTasksDone(taskList)) {
			startSpinner();
		} else if (spinnerInterval) {
			clearInterval(spinnerInterval);
			spinnerInterval = undefined;
		}
	};

	const destroy = () => {
		clearInterval(spinnerInterval);
		spinnerInterval = undefined;
		restoreConsole?.();
		restoreConsole = undefined;
		trackedLines.clear();
	};

	return {
		triggerRender: renderAndManageSpinner,
		flushRender: renderAndManageSpinner,
		renderFinal: renderAndManageSpinner,
		destroy,
		setMaxVisible: (limit) => {
			maxVisibleLimit = typeof limit === 'number' ? limit : undefined;
		},
	};
};
