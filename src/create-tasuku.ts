import { AsyncLocalStorage } from 'node:async_hooks';
import { Writable } from 'node:stream';
import pMap from 'p-map';
import stripAnsi from 'strip-ansi';
import { createRenderer, type Renderer } from './renderer.ts';
import { reactive } from './reactive.ts';
import {
	type TaskList,
	type TaskObject,
	type Task,
	type TaskPromise,
	type TasukuTheme,
	type TaskInnerAPI,
	type TaskGroupPromise,
	type TaskGroupResults,
	type TaskFunction,
	type TaskGroup,
	type TaskOptions,
	type RegisteredTask,
	type StreamPreview,
	runSymbol,
} from './types.ts';

const defaultPreviewLines = 5;

const createStreamPreview = (
	taskState: TaskObject,
	maxLines: number,
): StreamPreview => {
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

	const writable = new Writable({
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
	}) as StreamPreview;

	writable.clear = () => {
		taskState.streamOutput = undefined;
		taskState.streamTruncatedLines = undefined;
	};

	return writable;
};

export const createTasuku = (theme: TasukuTheme): Task => {
	const taskContext = new AsyncLocalStorage<TaskList>();
	let renderer: Renderer | undefined;
	const triggerRender = () => { renderer?.triggerRender(); };

	const createTaskInnerApi = (
		taskState: TaskObject,
		options?: TaskOptions,
	) => {
		let stream: StreamPreview | undefined;

		const api: TaskInnerAPI = {
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

	const registerTask = <T>(
		taskList: TaskList,
		taskTitle: string,
		taskFunction: TaskFunction<T>,
		options?: TaskOptions,
	): RegisteredTask<T> => {
		if (!renderer) {
			renderer = createRenderer(taskList, process.stdout, theme);
			taskList.isRoot = true;
		}

		const task = reactive<TaskObject>({
			title: taskTitle,
			state: 'pending',
			children: [],
		}, triggerRender);
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
					taskResult = await taskContext.run(task.children, () => taskFunction(api));
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

	const createTaskPromise = <T>(
		registeredTask: RegisteredTask<T>,
	): TaskPromise<T> => {
		const promise = registeredTask[runSymbol]();

		const taskPromise = promise as TaskPromise<T>;

		// Object.assign evaluates getters — must use defineProperties for live getters
		Object.defineProperties(taskPromise, {
			state: {
				get: () => registeredTask.task.state,
				enumerable: true,
				configurable: true,
			},
			warning: {
				get: () => (registeredTask.task.state === 'warning' ? registeredTask.task.output : undefined),
				enumerable: true,
				configurable: true,
			},
			error: {
				get: () => (registeredTask.task.state === 'error' ? registeredTask.task.output : undefined),
				enumerable: true,
				configurable: true,
			},
			clear: {
				value: () => {
					const { state } = registeredTask.task;
					if (state === 'success' || state === 'warning' || state === 'error') {
						registeredTask.clear();
					} else {
						taskPromise.finally(() => registeredTask.clear()).catch(() => {});
					}
					return taskPromise;
				},
				enumerable: true,
				configurable: true,
			},
		});

		return taskPromise;
	};

	const createTaskFunction = (
		rootTaskList: TaskList,
	): Task => {
		const task: Task = (
			title,
			taskFunction,
			options,
		) => {
			const taskList = taskContext.getStore() ?? rootTaskList;
			const registeredTask = registerTask(taskList, title, taskFunction, options);
			return createTaskPromise(registeredTask);
		};

		// group() uses an explicit task creator callback instead of AsyncLocalStorage
		// because it needs to register tasks without executing them — pMap controls
		// execution order and concurrency. Using the global task() here would start
		// tasks immediately, bypassing concurrency control.
		task.group = ((
			createTasks,
			options,
		) => {
			const taskList = taskContext.getStore() ?? rootTaskList;
			const tasksQueue = createTasks((
				title,
				taskFunction,
				taskOptions,
			) => registerTask(
				taskList,
				title,
				taskFunction,
				taskOptions,
			));

			if (options?.maxVisible !== undefined && renderer) {
				renderer.setMaxVisible(options.maxVisible);
			}

			type TasksQueueType = typeof tasksQueue extends readonly [...infer T extends RegisteredTask[]]
				? T
				: never;

			// pMap doesn't preserve tuple types, so we cast the result.
			// Safe because pMap preserves array order/length and each
			// [runSymbol]() returns the corresponding T from RegisteredTask<T>.
			const promise = pMap(
				tasksQueue,
				async registeredTask => registeredTask[runSymbol](),
				{
					concurrency: 1,
					...options,
				},
			) as Promise<unknown> as Promise<TaskGroupResults<TasksQueueType>>;

			const groupPromise = promise as unknown as TaskGroupPromise<TaskGroupResults<TasksQueueType>>;

			const clearAll = () => {
				for (const registeredTask of tasksQueue) {
					registeredTask.clear();
				}

				// Reset maxVisible after clear so subsequent groups use the default
				if (options?.maxVisible !== undefined && renderer) {
					renderer.setMaxVisible(undefined);
				}
			};

			Object.assign(groupPromise, {
				clear: () => {
					const allDone = tasksQueue.every(({ task }) => {
						const { state } = task;
						return state === 'success' || state === 'warning' || state === 'error';
					});

					if (allDone) {
						clearAll();
					} else {
						groupPromise.finally(() => clearAll()).catch(() => {});
					}
					return groupPromise;
				},
			});

			return groupPromise;
		}) as TaskGroup;

		return task;
	};

	const rootTaskList: TaskList = [];
	return createTaskFunction(rootTaskList);
};
