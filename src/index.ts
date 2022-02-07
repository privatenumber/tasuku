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

	const taskState = arrayAdd(taskList, {
		title: taskTitle,
		state: 'pending',
		children: [],
	});

	return {
		async [runSymbol]() {
			const api = createTaskInnerApi(taskState);

			taskState.state = 'loading';

			let taskResult;
			try {
				taskResult = await taskFunction(api);
			} catch (error) {
				api.setError(error as any);
				throw error;
			}

			if (taskState.state === 'loading') {
				taskState.state = 'success';
			}

			return taskResult;
		},
		clear() {
			arrayRemove(taskList, taskState);

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
		const taskState = registerTask(taskList, title, taskFunction);
		const result = await taskState[runSymbol]();

		return {
			result,
			clear: taskState.clear,
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
			async taskApi => await taskApi[runSymbol](),
			{
				concurrency: 1,
				...options,
			},
		)) as any;

		return {
			results,
			clear() {
				for (const taskApi of tasksQueue) {
					taskApi.clear();
				}
			},
		};
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
