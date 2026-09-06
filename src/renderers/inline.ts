import { stripVTControlCharacters } from 'node:util';
import { spinner, spinnerInterval as spinnerIntervalMs } from '../style.ts';
import { cachedStringWidth } from '../utils/cached-string-width.ts';
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
import { areAllTasksDone, isTerminalState } from '../utils/task-list.ts';
import { countNewlines } from '../utils/count-newlines.ts';

const segmenter = new Intl.Segmenter();

type TrackedLine = {
	offset: number; // 1-based: bottom row from cursor rest position
	rowCount: number;
	depth: number;
	outputWritten: boolean;
	outputRows?: number[];
	layoutVersion: number;
	subtreeBottom?: TrackedLine;
};

export const inline: RendererFactory = (
	taskList: TaskList,
	outputStream: NodeJS.WriteStream,
): Renderer => {
	const isTTY = outputStream.isTTY === true;
	const isInteractive = isTTY && !isCI;

	let animationFrame = 0;
	let spinnerFrame = 0;
	let spinnerInterval: NodeJS.Timeout | undefined;
	let restoreConsole: (() => void) | undefined;
	let streamController: StreamController | undefined;
	let siblingController: StreamController | undefined;
	let maxVisibleLimit: number | undefined;
	let outputColumn = 0;
	let reachableRows = (outputStream.rows || 24) - 1;
	let layoutVersion = 0;
	let terminalColumns = outputStream.columns;

	// Count physical rows, including automatic wrapping, across external writes.
	const countOutputRows = (data: string) => {
		const columns = outputStream.columns || 80;
		let rows = 0;
		for (const { segment } of segmenter.segment(stripVTControlCharacters(data))) {
			switch (segment) {
				case '\n':
				case '\r\n': {
					rows += 1;
					outputColumn = 0;
					break;
				}
				case '\r': {
					outputColumn = 0;
					break;
				}
				case '\t': {
					outputColumn = Math.min(columns - 1, outputColumn + (8 - (outputColumn % 8)));
					break;
				}
				case '\b': {
					outputColumn = Math.max(0, outputColumn - 1);
					break;
				}
				default: {
					const width = cachedStringWidth(segment);
					if (width > 0 && outputColumn + width > columns) {
						rows += 1;
						outputColumn = 0;
					}
					outputColumn += width;
				}
			}
		}
		return rows;
	};

	// Write the renderer's own output. Through the controller it's marked as our
	// own (so we don't count it as an external write), while other renderers on
	// the same stream still see it and keep their offsets in sync.
	const writeOutput = (data: string, rowCountChange?: number, minOffset?: number) => {
		if (streamController) {
			streamController.write(data, rowCountChange, minOffset);
		} else {
			outputStream.write(data);
		}
		outputColumn = 0;
	};

	// Each task line is tracked by its offset from the cursor rest position (1-based)
	const trackedLines = new Map<TaskObject, TrackedLine>();

	// Non-TTY: tracks which tasks have already been written (append-only)
	const committedTasks = new WeakSet<TaskObject>();

	// Write output/streamOutput for a completed task and return lines written.
	const writeTaskOutput = (task: TaskObject, depth: number): number => {
		const output = formatTaskOutput(task, depth);
		if (output) {
			const rows = isInteractive ? countOutputRows(output) : countNewlines(output);
			writeOutput(output);
			return rows;
		}
		return 0;
	};

	// --- TTY: Individual line tracking ---

	const getLine = (task: TaskObject, depth: number) => {
		const icon = getIcon(task.state, task.children.length > 0, spinnerFrame);
		return formatTaskLine(task, icon, depth);
	};

	const countTextRows = (text: string) => {
		const columns = outputStream.columns || 80;
		let column = 0;
		let rows = 1;
		for (const { segment } of segmenter.segment(stripVTControlCharacters(text))) {
			if (segment === '\n' || segment === '\r\n') {
				rows += 1;
				column = 0;
				continue;
			}
			if (segment === '\r') {
				column = 0;
				continue;
			}
			const width = cachedStringWidth(segment);
			if (width > 0 && column + width > columns) {
				rows += 1;
				column = 0;
			}
			column += width;
			if (column === columns) {
				column = 0;
				rows += 1;
			}
		}
		return column === 0 && rows > 1 ? rows - 1 : rows;
	};

	// Increment tracked offsets by count. Only offsets >= minOffset are affected.
	const incrementOffsets = (count: number, minOffset = 1) => {
		const viewportRows = (outputStream.rows || 24) - 1;
		reachableRows = Math.min(viewportRows, Math.min(reachableRows, viewportRows) + count);
		for (const [, tracked] of trackedLines) {
			if (tracked.offset >= minOffset) {
				tracked.offset += count;
			}
			if (tracked.outputRows) {
				for (let index = 0; index < tracked.outputRows.length; index += 1) {
					if (tracked.outputRows[index] >= minOffset) {
						tracked.outputRows[index] += count;
					}
				}
			}
		}
	};

	const liveTasks = new Set<TaskObject>();
	const collectLiveTasks = (tasks: TaskList) => {
		for (const task of tasks) {
			liveTasks.add(task);
			collectLiveTasks(task.children);
		}
	};

	const deleteRow = (offset: number) => {
		// Cursor-up cannot reach scrollback. Leave those rows untouched.
		if (offset > Math.min(reachableRows, (outputStream.rows || 24) - 1)) {
			return;
		}
		writeOutput(`\u001B[${offset}A\r\u001B[M${offset > 1 ? `\u001B[${offset - 1}B` : ''}`, -1, offset + 1);
		// Both the content below the deleted row and the rest position move up.
		incrementOffsets(-1, offset + 1);
	};

	const removeClearedTasks = () => {
		liveTasks.clear();
		collectLiveTasks(taskList);
		for (const [task, tracked] of trackedLines) {
			tracked.subtreeBottom = undefined;
			if (liveTasks.has(task)) {
				continue;
			}
			if (tracked.layoutVersion === layoutVersion && tracked.outputRows) {
				for (const offset of tracked.outputRows) {
					deleteRow(offset);
				}
			}
			if (tracked.layoutVersion === layoutVersion) {
				for (let index = tracked.rowCount - 1; index >= 0; index -= 1) {
					deleteRow(tracked.offset + index);
				}
			}
			trackedLines.delete(task);
		}
	};

	const finishExternalLine = () => {
		if (outputColumn > 0) {
			// Keep partial console output on its own row before moving the cursor.
			incrementOffsets(1);
			writeOutput('\n');
		}
	};

	// Append a new task line at cursor rest (bottom of all tracked content)
	const appendLineAtRest = (task: TaskObject, depth: number) => {
		const line = getLine(task, depth);
		const rowCount = countTextRows(line);
		incrementOffsets(rowCount);
		writeOutput(`${line}\n`);
		trackedLines.set(task, {
			offset: 1,
			rowCount,
			depth,
			outputWritten: false,
			layoutVersion,
		});
	};

	// Insert a new task line after a reference offset using CSI L (Insert Line).
	// Used for child tasks that need to appear below their parent, not at cursor rest.
	//
	// Given afterOffset N (the parent/last sibling's bottom row from rest):
	//   - Lines at offset >= N shift by the new title's row count
	//   - New title bottom is offset N (directly below the reference)
	//   - Cursor rest moves down by the new title's row count
	const insertLineAfterOffset = (task: TaskObject, depth: number, afterOffset: number) => {
		const maxOffset = Math.min(reachableRows, (outputStream.rows || 24) - 1);
		const line = getLine(task, depth);
		const rowCount = countTextRows(line);

		// Appending emits a newline, which scrolls when rest is at the bottom.
		if (afterOffset === 1 || afterOffset > maxOffset) {
			appendLineAtRest(task, depth);
			return;
		}

		incrementOffsets(rowCount, afterOffset);

		// CSI L inserts blank lines at cursor, pushing everything below down.
		// Move up to the row below the reference (where the next sibling is),
		// insert, write content, then return to the new rest position.
		// Reserve physical rows before inserting so cursor-down cannot clamp.
		const moveUp = afterOffset + rowCount - 1;
		const buffer = `${'\n'.repeat(rowCount)}\u001B[${moveUp}A\r\u001B[${rowCount}L${line}\u001B[${afterOffset}B\r`;

		writeOutput(buffer, rowCount, afterOffset);
		trackedLines.set(task, {
			offset: afterOffset,
			rowCount,
			depth,
			outputWritten: false,
			layoutVersion,
		});
	};

	const appendTrackedLineAtRest = (tracked: TrackedLine, content: string) => {
		const rowCount = countTextRows(content);
		incrementOffsets(rowCount);
		writeOutput(`${content}\n`);
		tracked.offset = 1;
		tracked.rowCount = rowCount;
		tracked.layoutVersion = layoutVersion;
		tracked.outputRows = undefined;
		tracked.subtreeBottom = undefined;
	};

	// Update a tracked line in-place via cursor-up/down
	const updateLineInPlace = (tracked: TrackedLine, content: string) => {
		const maxOffset = Math.min(reachableRows, (outputStream.rows || 24) - 1);
		if (tracked.layoutVersion !== layoutVersion) {
			appendTrackedLineAtRest(tracked, content);
			return;
		}
		const topOffset = tracked.offset + tracked.rowCount - 1;
		if (topOffset > maxOffset) {
			// Task scrolled off screen — can't reach it
			return;
		}
		const rowCount = countTextRows(content);
		if (rowCount !== tracked.rowCount) {
			if (tracked.offset === 1) {
				for (let index = 0; index < tracked.rowCount; index += 1) {
					deleteRow(1);
				}
			}
			appendTrackedLineAtRest(tracked, content);
			return;
		}
		const clearRows = Array.from(
			{ length: rowCount },
			(_, index) => `\r\u001B[2K${index < rowCount - 1 ? '\u001B[1B' : ''}`,
		).join('');
		const returnToTop = rowCount > 1 ? `\u001B[${rowCount - 1}A` : '';
		writeOutput(`\u001B[${topOffset}A${clearRows}\r${returnToTop}${content}\u001B[${tracked.offset}B\r`);
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
	// References follow offset updates as other lines are inserted or deleted.
	const processTaskList = (
		tasks: TaskList | TaskObject[],
		depth: number,
		parent?: TrackedLine,
	) => {
		let lastSubtreeBottom = parent?.subtreeBottom ?? parent;

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

				if (lastSubtreeBottom) {
					// Child task: insert after parent/previous sibling
					insertLineAfterOffset(task, depth, lastSubtreeBottom.offset);
				} else {
					// Root task: append at cursor rest
					appendLineAtRest(task, depth);
				}
				tracked = trackedLines.get(task)!;
			}
			if (tracked.layoutVersion !== layoutVersion) {
				updateLineInPlace(tracked, getLine(task, tracked.depth));
			}

			// Process children — they insert after this task's line
			if (task.children.length > 0) {
				processTaskList(task.children, depth + 1, tracked);
			}

			const currentBottom = tracked.subtreeBottom ?? tracked;
			if (lastSubtreeBottom && currentBottom.offset < lastSubtreeBottom.offset) {
				lastSubtreeBottom = currentBottom;
			}

			const isDone = isTerminalState(task.state);

			if (isDone && !tracked.outputWritten) {
				// Task just completed — update line with final icon
				updateLineInPlace(tracked, getLine(task, tracked.depth));

				// Write output at cursor rest position
				const linesWritten = writeTaskOutput(task, tracked.depth);
				if (linesWritten > 0) {
					incrementOffsets(linesWritten);
					tracked.outputRows ??= [];
					for (let offset = linesWritten; offset > 0; offset -= 1) {
						tracked.outputRows.push(offset);
					}
				}
				tracked.outputWritten = true;
			} else if (!isDone && tracked.outputWritten) {
				// Task reverted to loading (setError/setWarning false)
				tracked.outputWritten = false;
			}
		}

		if (parent) {
			parent.subtreeBottom = lastSubtreeBottom;
		}
	};

	// Batched spinner frame update for all tracked loading tasks
	const renderSpinnerFrames = () => {
		finishExternalLine();
		const maxOffset = Math.min(reachableRows, (outputStream.rows || 24) - 1);

		for (const [task, tracked] of trackedLines) {
			if (
				tracked.layoutVersion !== layoutVersion
				|| tracked.outputWritten
				|| task.state !== 'loading'
				|| tracked.offset + tracked.rowCount - 1 > maxOffset
			) {
				continue;
			}

			updateLineInPlace(tracked, getLine(task, tracked.depth));
		}
	};

	const renderTTY = () => {
		finishExternalLine();
		removeClearedTasks();
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
			writeOutput(`${getLine(task, depth)}\n`);

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

	// --- Output coordination ---

	// Track external output so in-place line offsets stay correct. Only needed
	// for TTY in-place rendering; non-TTY output is append-only.
	//
	// Two sources, matching how they reach the terminal:
	// - console.* (patchConsole): may go to stdout or stderr. In a normal TTY
	//   both share the cursor, so count either; with redirection only ours.
	// - raw writes to our stream (interceptStream): always move our cursor, and
	//   this is also how other renderers on the same stream notify us.
	if (isInteractive) {
		const isStderr = outputStream === process.stderr
			|| ('fd' in outputStream && outputStream.fd === 2);
		const ownStreamName = isStderr ? 'stderr' : 'stdout';
		const bothStreamsTTY = process.stdout.isTTY === true && process.stderr.isTTY === true;

		const countExternalLines = (data: string, rowCountChange?: number, minOffset?: number) => {
			if (rowCountChange !== undefined) {
				incrementOffsets(rowCountChange, minOffset);
				return;
			}
			const newlineCount = countOutputRows(data);
			if (newlineCount > 0) {
				incrementOffsets(newlineCount);
			}
		};

		restoreConsole = patchConsole({
			after: (stream, data) => {
				if (stream === ownStreamName || bothStreamsTTY) {
					countExternalLines(data);
				}
			},
		});
		streamController = interceptStream(outputStream, {
			after: (data, _fromPeer, rowCountChange, minOffset) => (
				countExternalLines(data, rowCountChange, minOffset)
			),
		});

		// Raw writes to the sibling stream shift our cursor in a shared TTY too.
		const siblingStream = getSiblingStream(outputStream);
		if (siblingStream) {
			siblingController = interceptStream(siblingStream, {
				after: (data, _fromPeer, rowCountChange, minOffset) => (
					countExternalLines(data, rowCountChange, minOffset)
				),
			});
		}
	}

	const handleResize = () => {
		if (outputStream.columns !== terminalColumns) {
			terminalColumns = outputStream.columns;
			layoutVersion += 1;
		}
	};
	if (isInteractive) {
		outputStream.on('resize', handleResize);
	}

	// --- Spinner ---

	const startSpinner = () => {
		if (spinnerInterval || !isInteractive) {
			return;
		}
		spinnerInterval = setInterval(() => {
			animationFrame += 1;
			spinnerFrame = animationFrame % spinner.length;
			renderSpinnerFrames();
		}, spinnerIntervalMs);
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
		outputStream.off('resize', handleResize);
		clearInterval(spinnerInterval);
		spinnerInterval = undefined;
		streamController?.restore();
		streamController = undefined;
		siblingController?.restore();
		siblingController = undefined;
		restoreConsole?.();
		restoreConsole = undefined;
		trackedLines.clear();
		liveTasks.clear();
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
