import { proxy } from 'valtio';
import pMap from 'p-map';
import { arrayAdd, arrayRemove } from './utils';
import { createApp } from './components/CreateApp';
import type {
	TaskList,
	TaskObject,
	Task,
	TaskAPI,
	TaskInnerAPI,
	TaskGroupAPI,
	TaskFunction,
	RegisteredTask,
} from './types';
import { runSymbol } from './types';

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
			api.setOutput(warning);
		},
		setError(error) {
			taskState.state = 'error';
			api.setOutput(error);
		},
	};
	return api;
};

let app: ReturnType<typeof createApp> | undefined;

function registerTask<T>(
	taskList: TaskList,
	taskTitle: string,
	taskFunction: TaskFunction<T>,
): RegisteredTask<T> {
	if (!app) {
		app = createApp(taskList);
		taskList.isRoot = true;
	}

	const task = arrayAdd(taskList, {
		title: taskTitle,
		state: 'pending',
		children: [],
	});

	return {
		task,
		async [runSymbol]() {
			const api = createTaskInnerApi(task);

			task.state = 'loading';

			let taskResult;
			try {
				taskResult = await taskFunction(api);
			} catch (error) {
				api.setError(error as any);
				throw error;
			}

			if (task.state === 'loading') {
				task.state = 'success';
			}

			return taskResult;
		},
		clear() {
			arrayRemove(taskList, task);

			if (taskList.isRoot && taskList.length === 0) {
				app!.remove();
				app = undefined;
			}
		},
	};
}

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

	task.group = async (
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
		)) as any;

		return Object.assign(results, {
			clear() {
				for (const taskApi of tasksQueue) {
					taskApi.clear();
				}
			},
		});
	};

	return task;
}

const rootTaskList = proxy<TaskList>([]);

export default createTaskFunction(rootTaskList);
export type {
	Task,
	TaskAPI,
	TaskInnerAPI,
	TaskFunction,
	TaskGroupAPI,
};
