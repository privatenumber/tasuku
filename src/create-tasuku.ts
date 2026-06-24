import { AsyncLocalStorage } from 'node:async_hooks';
import pMap from 'p-map';
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

type RenderCallbacks = {
	triggerRender: () => void;
	flushRender: (force?: boolean) => void;
};

type TaskContext = RenderCallbacks & {
	children: TaskList;
	abortController: AbortController;
};

// Module-level ALS shared across all createTasuku instances.
// This enables cross-instance nesting: taskB called inside taskA's
// callback will correctly nest as a child of taskA's task.
const taskContext = new AsyncLocalStorage<TaskContext>();

export const createTasuku = ({
	renderer: rendererFactory,
	outputStream,
}: CreateTasukuOptions): Task => {
	let renderer: Renderer | undefined;
	const triggerRender = () => { renderer?.triggerRender(); };
	const flushRender = (force?: boolean) => { renderer?.flushRender(force); };
	const rootRenderCallbacks: RenderCallbacks = {
		triggerRender,
		flushRender,
	};

	const createTaskInnerApi = (
		taskState: TaskObject,
		signal: AbortSignal,
		options: TaskOptions | undefined,
		renderCallbacks: RenderCallbacks,
	) => {
		let stream: StreamPreview | undefined;

		const toMessage = (output: string | { message: string }) => (
			typeof output === 'string' ? output : output.message
		);

		const api: TaskInnerAPI = {
			signal,
			setTitle(title) {
				if (taskState.title === title) {
					return;
				}
				taskState.title = title;
				renderCallbacks.flushRender();
			},
			setStatus(status) {
				if (taskState.status === status) {
					return;
				}
				taskState.status = status;
				renderCallbacks.flushRender();
			},
			setOutput(output) {
				const message = toMessage(output);
				if (taskState.output === message) {
					return;
				}
				taskState.output = message;
				renderCallbacks.flushRender();
			},
			get streamPreview() {
				if (!stream) {
					stream = createStreamPreview(
						taskState,
						Math.max(1, Math.trunc(options?.previewLines ?? defaultPreviewLines)),
						// Stream output is high-frequency, so it renders on the
						// throttled path rather than painting on every chunk.
						renderCallbacks.triggerRender,
					);
				}
				return stream;
			},
			// setWarning/setError change output and state together, so they mutate
			// both then flush once — painting per-property would emit a transient
			// frame (e.g. loading icon with the warning message under it).
			setWarning(warning) {
				if (warning) {
					taskState.output = toMessage(warning);
					taskState.state = 'warning';
				} else {
					taskState.state = 'loading';
					taskState.output = undefined;
				}
				renderCallbacks.flushRender();
			},
			setError(error) {
				if (error) {
					taskState.output = toMessage(error);
					taskState.state = 'error';
				} else {
					taskState.state = 'loading';
					taskState.output = undefined;
				}
				renderCallbacks.flushRender();
			},
			skip(message?: string): never {
				throw new TaskSkipError(message);
			},
			// startTime/stopTime only mutate the timestamps. The elapsed display is
			// driven by spinner-frame repaints (and the completion paint), so they
			// don't force a render of their own.
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
			renderer = rendererFactory(taskList, outputStream ?? process.stderr);
			taskList.isRoot = true;
		}
	};

	const registerTask = <T>(
		taskList: TaskList,
		taskTitle: string,
		taskFunction: TaskFunction<T>,
		options: TaskOptions | undefined,
		renderCallbacks: RenderCallbacks,
	): RegisteredTask<T> => {
		const task: TaskObject = {
			title: taskTitle,
			state: 'pending',
			children: [],
		};
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
				const { api, dispose } = createTaskInnerApi(
					task,
					signal,
					options,
					renderCallbacks,
				);

				task.state = 'loading';
				// Paint immediately so the task is visible before the callback runs,
				// even if the callback blocks the event loop with synchronous work.
				renderCallbacks.flushRender();

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
							triggerRender: renderCallbacks.triggerRender,
							flushRender: renderCallbacks.flushRender,
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
						renderCallbacks.flushRender();
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
					renderCallbacks.flushRender(true);
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
				renderCallbacks.flushRender();

				return taskResult;
			},
			clear: () => {
				const index = taskList.indexOf(task);
				if (index !== -1) {
					taskList.splice(index, 1);
				}

				if (renderer && taskList.isRoot && taskList.length === 0) {
					// Final render to clear output before destroying
					renderer.renderFinal();
					renderer.destroy();
					renderer = undefined;
				} else {
					// Trigger re-render via callbacks (works for both
					// same-instance and cross-instance nested tasks)
					renderCallbacks.triggerRender();
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

	// Resolve task list and render callbacks from ALS context.
	// When nested inside another instance's task, uses the parent's
	// children list and render callbacks. At root level, uses this
	// instance's own task list and renderer.
	const resolveContext = (rootTaskList: TaskList) => {
		const parentContext = taskContext.getStore();
		if (parentContext) {
			return {
				taskList: parentContext.children,
				renderCallbacks: {
					triggerRender: parentContext.triggerRender,
					flushRender: parentContext.flushRender,
				},
			};
		}
		ensureRenderer(rootTaskList);
		return {
			taskList: rootTaskList,
			renderCallbacks: rootRenderCallbacks,
		};
	};

	const createTaskFunction = (
		rootTaskList: TaskList,
	): Task => {
		const task: Task = (
			title,
			taskFunction,
			options,
		) => {
			const { taskList, renderCallbacks } = resolveContext(rootTaskList);
			const registeredTask = registerTask(taskList, title, taskFunction, options, renderCallbacks);
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
			const { taskList, renderCallbacks } = resolveContext(rootTaskList);
			const tasksQueue = createTasks((
				title,
				taskFunction,
				taskOptions,
			) => registerTask(
				taskList,
				title,
				taskFunction,
				taskOptions,
				renderCallbacks,
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
