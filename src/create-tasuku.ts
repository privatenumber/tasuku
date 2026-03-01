import { AsyncLocalStorage } from 'node:async_hooks';
import pMap from 'p-map';
import { reactive } from './reactive.ts';
import { isTerminalState } from './utils/task-list.ts';
import { createStreamPreview, defaultPreviewLines } from './utils/stream-preview.ts';
import type {
	Renderer,
	TaskList,
	TaskObject,
	Task,
	TaskPromise,
	TaskInnerAPI,
	TaskGroupPromise,
	TaskGroupResults,
	TaskFunction,
	TaskGroup,
	TaskOptions,
	RegisteredTask,
	StreamPreview,
	CreateTasukuOptions,
} from './types.ts';

class TaskSkipError {
	message: string;

	constructor(message?: string) {
		this.message = message ?? '';
	}
}

export const createTasuku = ({
	theme,
	renderer: rendererFactory,
	outputStream,
}: CreateTasukuOptions): Task => {
	type TaskContext = {
		children: TaskList;
		abortController: AbortController;
	};
	const taskContext = new AsyncLocalStorage<TaskContext>();
	let renderer: Renderer | undefined;
	const triggerRender = () => { renderer?.triggerRender(); };

	const createTaskInnerApi = (
		taskState: TaskObject,
		signal: AbortSignal,
		options?: TaskOptions,
	) => {
		let stream: StreamPreview | undefined;

		const api: TaskInnerAPI = {
			signal,
			setTitle(title) {
				taskState.title = title;
			},
			setStatus(status) {
				taskState.status = status;
			},
			setOutput(output) {
				taskState.output = typeof output === 'string'
					? output
					: output.message;
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
					api.setOutput(warning);
					taskState.state = 'warning';
				} else {
					taskState.state = 'loading';
					taskState.output = undefined;
				}
			},
			setError(error) {
				if (error) {
					api.setOutput(error);
					taskState.state = 'error';
				} else {
					taskState.state = 'loading';
					taskState.output = undefined;
				}
			},
			skip(message?: string): never {
				throw new TaskSkipError(message);
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
			dispose: () => stream?.destroy(),
		};
	};

	const ensureRenderer = (taskList: TaskList) => {
		if (!renderer) {
			renderer = rendererFactory(taskList, outputStream ?? process.stderr, theme);
			taskList.isRoot = true;
		}
	};

	const registerTask = <T>(
		taskList: TaskList,
		taskTitle: string,
		taskFunction: TaskFunction<T>,
		options?: TaskOptions,
	): RegisteredTask<T> => {
		const task = reactive<TaskObject>({
			title: taskTitle,
			state: 'pending',
			children: [],
		}, triggerRender);
		taskList.push(task);

		return {
			task,
			run: async (groupSignal?: AbortSignal) => {
				// Collect all signal sources: group, per-task option, parent context
				const parentSignal = taskContext.getStore()?.abortController.signal;
				const childController = new AbortController();
				const externalSignals = [
					groupSignal,
					options?.signal,
					parentSignal,
				].filter(Boolean) as AbortSignal[];

				// Forward abort from external signals to childController.
				// Using addEventListener instead of AbortSignal.any() to allow
				// cleanup — AbortSignal.any() retains references on long-lived
				// source signals, which accumulates in long-running processes.
				const forwardAbort = function (this: AbortSignal) {
					childController.abort(this.reason);
				};
				for (const source of externalSignals) {
					if (source.aborted) {
						childController.abort(source.reason);
						break;
					}
					source.addEventListener('abort', forwardAbort);
				}
				const cleanupSignalListeners = () => {
					for (const source of externalSignals) {
						source.removeEventListener('abort', forwardAbort);
					}
				};

				const { signal } = childController;
				const { api, dispose } = createTaskInnerApi(task, signal, options);

				task.state = 'loading';

				// Auto-start timer if showTime option is set
				if (options?.showTime) {
					api.startTime();
				}

				let taskResult;
				try {
					taskResult = await taskContext.run(
						{
							children: task.children,
							abortController: childController,
						},
						() => taskFunction(api),
					);
				} catch (error) {
					if (error instanceof TaskSkipError) {
						api.stopTime();
						if (error.message) {
							task.output = error.message;
						}
						task.state = 'skipped';
						dispose();
						cleanupSignalListeners();
						renderer?.flushRender();
						return undefined as T;
					}

					// Abort child tasks when parent fails — pass the error as reason
					childController.abort(error);
					// Auto-stop timer on error
					api.stopTime();
					api.setError(
						error instanceof Error
							|| (typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message: unknown }).message === 'string')
							? (error as Error)
							: String(error),
					);
					dispose();
					cleanupSignalListeners();
					// Force-flush render before throwing — the process may crash before
					// the deferred 33ms render fires, leaving error state invisible
					renderer?.flushRender(true);
					throw error;
				}

				// Auto-stop timer on completion
				api.stopTime();
				dispose();
				cleanupSignalListeners();

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
		const promise = registeredTask.run();

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
			skipped: {
				get: () => (registeredTask.task.state === 'skipped' ? registeredTask.task.output : undefined),
				enumerable: true,
				configurable: true,
			},
			clear: {
				value: () => {
					const { state } = registeredTask.task;
					if (isTerminalState(state)) {
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
			const taskList = taskContext.getStore()?.children ?? rootTaskList;
			ensureRenderer(taskList);
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
			const taskList = taskContext.getStore()?.children ?? rootTaskList;
			ensureRenderer(taskList);
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

			// Create internal AbortController for auto-abort on failure.
			// Forward external signal to groupController instead of using
			// AbortSignal.any() to allow cleanup after group completes.
			const groupController = new AbortController();
			const externalGroupSignal = options?.signal;
			const forwardGroupAbort = function (this: AbortSignal) {
				groupController.abort(this.reason);
			};
			if (externalGroupSignal) {
				if (externalGroupSignal.aborted) {
					groupController.abort(externalGroupSignal.reason);
				} else {
					externalGroupSignal.addEventListener('abort', forwardGroupAbort);
				}
			}
			const combinedSignal = groupController.signal;

			const stopOnError = options?.stopOnError !== false;

			// pMap doesn't preserve tuple types, so we cast the result.
			// Safe because pMap preserves array order/length and each
			// run() returns the corresponding T from RegisteredTask<T>.
			const promise = pMap(
				tasksQueue,
				async (registeredTask) => {
					try {
						return await registeredTask.run(combinedSignal);
					} catch (error) {
						if (stopOnError) {
							groupController.abort(error);
						}
						throw error;
					}
				},
				{
					concurrency: options?.concurrency ?? 1,
					stopOnError,
					signal: combinedSignal,
				},
			) as Promise<unknown> as Promise<TaskGroupResults<TasksQueueType>>;

			// Clean up forwarding listener when group settles
			const settled = promise.finally(() => {
				if (externalGroupSignal) {
					externalGroupSignal.removeEventListener('abort', forwardGroupAbort);
				}
			}) as Promise<TaskGroupResults<TasksQueueType>>;

			const groupPromise = settled as unknown as TaskGroupPromise<TaskGroupResults<TasksQueueType>>;

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
					const allDone = tasksQueue.every(({ task }) => isTerminalState(task.state));

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
