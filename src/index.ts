import { Writable } from 'node:stream';
import pMap from 'p-map';
import stripAnsi from 'strip-ansi';
import { createRenderer, type Renderer } from './renderer.js';
import { reactive, setRenderCallback } from './reactive.js';
import {
	type TaskList,
	type TaskObject,
	type Task,
	type TaskAPI,
	type TaskInnerAPI,
	type TaskGroupAPI,
	type TaskGroupResults,
	type TaskFunction,
	type TaskGroup,
	type TaskOptions,
	type RegisteredTask,
	runSymbol,
} from './types.js';

const defaultPreviewLines = 5;

const createStreamPreview = (
	taskState: TaskObject,
	maxLines: number,
): Writable => {
	const lines: string[] = [];
	let totalLines = 0;
	let partialLine = '';

	// Resolve \r within a string: keep content after the last \r.
	// For trailing \r (nothing after), keep the last non-empty segment.
	const resolveCarriageReturn = (text: string) => {
		const segments = text.split('\r');
		return segments.reverse().find(Boolean) ?? '';
	};

	const flush = () => {
		const displayPartial = partialLine.includes('\r')
			? resolveCarriageReturn(partialLine)
			: partialLine;
		const output = displayPartial
			? [...lines, displayPartial].join('\n')
			: lines.join('\n');
		taskState.streamOutput = output;
		taskState.streamTruncatedLines = Math.max(0, totalLines - maxLines);
	};

	return new Writable({
		write(chunk: Buffer, _encoding, callback) {
			const text = stripAnsi(partialLine + chunk.toString());
			const parts = text.split(/\r?\n/);

			// Last element is either empty (if chunk ended with \n) or a partial line
			partialLine = parts.pop()!;

			for (const rawLine of parts) {
				// Handle \r (carriage return) — keep content after last \r
				const line = rawLine.includes('\r')
					? resolveCarriageReturn(rawLine)
					: rawLine;
				lines.push(line);
				totalLines += 1;
				if (lines.length > maxLines) {
					lines.shift();
				}
			}

			// Trim accumulated \r segments to prevent unbounded growth
			if (partialLine.includes('\r')) {
				const resolved = resolveCarriageReturn(partialLine);
				// Keep trailing \r as boundary marker for next chunk
				partialLine = partialLine.endsWith('\r')
					? `${resolved}\r`
					: resolved;
			}

			if (parts.length > 0 || partialLine) {
				flush();
			}

			callback();
		},

		final(callback) {
			// Flush any remaining partial line
			if (partialLine) {
				const line = partialLine.includes('\r')
					? resolveCarriageReturn(partialLine)
					: partialLine;
				lines.push(line);
				totalLines += 1;
				if (lines.length > maxLines) {
					lines.shift();
				}
				partialLine = '';
				flush();
			}
			callback();
		},
	});
};

const createTaskInnerApi = (
	taskState: TaskObject,
	options?: TaskOptions,
) => {
	let stream: Writable | undefined;

	const api: TaskInnerAPI = {
		task: createTaskFunction(taskState.children),
		setTitle(title) {
			taskState.title = title;
		},
		setStatus(status) {
			taskState.status = status;
		},
		setOutput(output) {
			taskState.output = (
				typeof output === 'string'
					? output
					: (
						'message' in output
							? output.message
							: ''
					)
			);
		},
		get streamPreview() {
			if (!stream) {
				stream = createStreamPreview(
					taskState,
					Math.max(1, Math.trunc(options?.previewLines ?? defaultPreviewLines)),
				);
			}
			return stream;
		},
		setWarning(warning) {
			if (warning) {
				taskState.state = 'warning';
				api.setOutput(warning);
			} else {
				taskState.state = 'loading';
				taskState.output = undefined;
			}
		},
		setError(error) {
			if (error) {
				taskState.state = 'error';
				api.setOutput(error);
			} else {
				taskState.state = 'loading';
				taskState.output = undefined;
			}
		},
		startTime: () => {
			taskState.startedAt = Date.now();
			taskState.elapsedMs = undefined;
		},
		stopTime: () => {
			if (taskState.startedAt === undefined) {
				return 0;
			}
			taskState.elapsedMs = Date.now() - taskState.startedAt;
			taskState.startedAt = undefined;
			return taskState.elapsedMs;
		},
	};
	return {
		api,
		destroyStream: () => stream?.destroy(),
	};
};

let renderer: Renderer | undefined;

const registerTask = <T>(
	taskList: TaskList,
	taskTitle: string,
	taskFunction: TaskFunction<T>,
	options?: TaskOptions,
): RegisteredTask<T> => {
	if (!renderer) {
		renderer = createRenderer(taskList);
		setRenderCallback(() => renderer!.triggerRender());
		taskList.isRoot = true;
	}

	const task = reactive<TaskObject>({
		title: taskTitle,
		state: 'pending',
		children: [],
	});
	taskList.push(task);

	return {
		task,
		[runSymbol]: async () => {
			const { api, destroyStream } = createTaskInnerApi(task, options);

			task.state = 'loading';

			// Auto-start timer if showTime option is set
			if (options?.showTime) {
				api.startTime();
			}

			let taskResult;
			try {
				taskResult = await taskFunction(api);
			} catch (error) {
				// Auto-stop timer on error
				api.stopTime();
				api.setError(error as Error);
				destroyStream();
				// Flush render before throwing to prevent overwriting subsequent output
				renderer?.flushRender();
				throw error;
			}

			// Auto-stop timer on completion
			api.stopTime();
			destroyStream();

			if (task.state === 'loading') {
				task.state = 'success';
			}

			// Flush render before returning to prevent overwriting subsequent output
			renderer?.flushRender();

			return taskResult;
		},
		clear: () => {
			const index = taskList.indexOf(task);
			if (index !== -1) {
				taskList.splice(index, 1);
			}

			if (renderer) {
				if (taskList.isRoot && taskList.length === 0) {
					// Final render to clear output before destroying
					renderer.renderFinal();
					renderer.destroy();
					renderer = undefined;
				} else {
					// Normal render for non-final clear
					renderer.triggerRender();
				}
			}
		},
	};
};

const toTaskApi = <T>(
	registeredTask: RegisteredTask<T>,
	result: T,
): TaskAPI<T> => ({
	result,
	get state() {
		return registeredTask.task.state;
	},
	get warning() {
		return registeredTask.task.state === 'warning' ? registeredTask.task.output : undefined;
	},
	get error() {
		return registeredTask.task.state === 'error' ? registeredTask.task.output : undefined;
	},
	clear: registeredTask.clear,
});

function createTaskFunction(
	taskList: TaskList,
): Task {
	const task: Task = async (
		title,
		taskFunction,
		options,
	) => {
		const registeredTask = registerTask(taskList, title, taskFunction, options);
		const result = await registeredTask[runSymbol]();
		return toTaskApi(registeredTask, result);
	};

	task.group = (async (
		createTasks,
		options,
	) => {
		const tasksQueue = createTasks((
			title,
			taskFunction,
		) => registerTask(
			taskList,
			title,
			taskFunction,
		));

		if (options?.maxVisible !== undefined && renderer) {
			renderer.setMaxVisible(options.maxVisible);
		}

		// pMap doesn't preserve tuple types, so we need to cast the result
		// The cast is safe because:
		// 1. pMap preserves array order and length
		// 2. We're mapping RegisteredTask<T> → TaskAPI<T>
		// 3. TaskGroupResults preserves the tuple structure
		type TasksQueueType = typeof tasksQueue extends readonly [...infer T extends RegisteredTask[]]
			? T
			: never;

		const results = (await pMap(
			tasksQueue,
			async registeredTask => toTaskApi(
				registeredTask,
				await registeredTask[runSymbol](),
			),
			{
				concurrency: 1,
				...options,
			},
		)) as unknown as TaskGroupResults<TasksQueueType>;

		// TypeScript can't prove TasksQueueType matches the generic RegisteredTasks
		// so we need to assert the return type
		return Object.assign(results, {
			clear: () => {
				for (const taskApi of tasksQueue) {
					taskApi.clear();
				}

				// Reset maxVisible after clear so subsequent groups use the default
				if (options?.maxVisible !== undefined && renderer) {
					renderer.setMaxVisible(undefined);
				}
			},
		}) as unknown as TaskGroupAPI<typeof results>;
	}) as TaskGroup;

	return task;
}

const rootTaskList: TaskList = [];

export default createTaskFunction(rootTaskList);
export type {
	Task,
	TaskAPI,
	TaskInnerAPI,
	TaskFunction,
	TaskGroupAPI,
	TaskOptions,
};
