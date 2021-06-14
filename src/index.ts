import { proxy } from 'valtio';
import pMap, { Options } from 'p-map';
import { arrayAdd, arrayRemove } from './utils';
import { TaskList, TaskObject, Awaited } from './types';
import { createApp } from './components/CreateApp';

const createTaskInnerApi = (taskState: TaskObject) => {
	const api = {
		task: createTaskFunction(taskState.children),
		setTitle(title: string) {
			taskState.title = title;
		},
		setStatus(status: string) {
			taskState.status = status;
		},
		setOutput(output: string | { message: string }) {
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
		setWarning(warning: Error | string) {
			taskState.state = 'warning';
			api.setOutput(warning);
		},
		setError(error: Error | string) {
			taskState.state = 'error';
			api.setOutput(error);
		},
	};
	return api;
};

// Until full ESM
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace task {
	export type TaskInnerApi = ReturnType<typeof createTaskInnerApi>;
	export type TaskFunction = (taskHelpers: TaskInnerApi) => Promise<unknown>;
}

type TaskApi<T extends task.TaskFunction> = {
	run: () => Promise<Awaited<ReturnType<T>>>;
	clear: () => void;
};
type TaskResults<
	T extends task.TaskFunction,
	Tasks extends TaskApi<T>[]
> = {
	[key in keyof Tasks]: (
		Tasks[key] extends TaskApi<T>
			? Awaited<ReturnType<Tasks[key]['run']>>
			: Tasks[key]
	);
};

let app: ReturnType<typeof createApp>;

function registerTask<T extends task.TaskFunction>(
	taskList: TaskList,
	taskTitle: string,
	taskFunction: T,
): TaskApi<T> {
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
		async run() {
			const api = createTaskInnerApi(taskState);

			taskState.state = 'loading';

			let taskResult;
			try {
				taskResult = await taskFunction(api);
			} catch (error) {
				api.setError(error);
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
				app.remove();
				app = null;
			}
		},
	};
}

function createTaskFunction(
	taskList: TaskList,
) {
	async function task<T extends task.TaskFunction>(
		title: string,
		taskFunction: T,
	) {
		const taskState = registerTask(taskList, title, taskFunction);
		const result = await taskState.run();

		return Object.assign(
			taskState,
			{ result },
		);
	}

	const createTask = <T extends task.TaskFunction>(
		title: string,
		taskFunction: T,
	) => registerTask(
			taskList,
			title,
			taskFunction,
		);

	task.group = async <
		T extends task.TaskFunction,
		Tasks extends TaskApi<T>[]
	>(
		createTasks: (taskCreator: typeof createTask) => readonly [...Tasks],
		options?: Options,
	) => {
		const tasksQueue = createTasks(createTask);
		const results = (await pMap(
			tasksQueue,
			async taskApi => await taskApi.run(),
			{
				concurrency: 1,
				...options,
			},
		)) as unknown as TaskResults<T, Tasks>;

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
const task = createTaskFunction(rootTaskList);

export = task;
