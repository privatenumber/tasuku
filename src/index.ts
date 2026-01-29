import pMap from 'p-map';
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
	type RegisteredTask,
	runSymbol,
} from './types.js';

const createTaskInnerApi = (taskState: TaskObject) => {
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
		setWarning(warning) {
			taskState.state = 'warning';

			if (warning !== undefined) {
				api.setOutput(warning);
			}
		},
		setError(error) {
			taskState.state = 'error';

			if (error !== undefined) {
				api.setOutput(error);
			}
		},
	};
	return api;
};

let renderer: Renderer | undefined;

const registerTask = <T>(
	taskList: TaskList,
	taskTitle: string,
	taskFunction: TaskFunction<T>,
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
			const api = createTaskInnerApi(task);

			task.state = 'loading';

			let taskResult;
			try {
				taskResult = await taskFunction(api);
			} catch (error) {
				api.setError(error as Error);
				// Flush render before throwing to prevent overwriting subsequent output
				renderer?.flushRender();
				throw error;
			}

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

function createTaskFunction(
	taskList: TaskList,
): Task {
	const task: Task = async (
		title,
		taskFunction,
	) => {
		const registeredTask = registerTask(taskList, title, taskFunction);
		const result = await registeredTask[runSymbol]();

		return {
			result,
			get state() {
				return registeredTask.task.state;
			},
			clear: registeredTask.clear,
		};
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
			async taskApi => ({
				result: await taskApi[runSymbol](),
				get state() {
					return taskApi.task.state;
				},
				clear: taskApi.clear,
			}),
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
};
