import type { Options } from 'p-map';

export type TaskObject = {
	title: string;
	state: 'pending' | 'loading' | 'error' | 'warning' | 'success';
	children: TaskObject[];
	status?: string;
	output?: string;
}

export type TaskList = TaskObject[] & {
	isRoot?: boolean;
}

export type TaskInnerAPI = {
	task: Task;
	setTitle(title: string): void;
	setStatus(status: string): void;
	setOutput(output: string | { message: string }): void;
	setWarning(warning: Error | string): void;
	setError(error: Error| string): void;
};

export type TaskFunction<T> = (innerApi: TaskInnerAPI) => Promise<T>;

export const runSymbol: unique symbol = Symbol('run');

export type RegisteredTask<T = any> = {
	[runSymbol]: () => Promise<T>; // ReturnType<TaskFunction<T>>;
	clear: () => void;
};

export type CreateTask = <ReturnType>(
	title: string,
	taskFunction: TaskFunction<ReturnType>,
) => RegisteredTask<ReturnType>;

export type TaskAPI<Result = any> = {
	result: Result;
	clear: () => void;
};

export type Task = (
	<TaskReturnType>(
		/**
		 * The task title
		 */
		title: string,

		/**
		 * The task function
		 */
		taskFunction: TaskFunction<TaskReturnType>
	) => Promise<TaskAPI<TaskReturnType>>
) & { group: TaskGroup }

type TaskGroupResults<
	RegisteredTasks extends RegisteredTask[]
> = {
	[Key in keyof RegisteredTasks]: (
		RegisteredTasks[Key] extends RegisteredTask<infer ReturnType>
			? ReturnType
			: unknown
	);
};

export type TaskGroupAPI<Results = any> = {
	results: Results;
	clear(): void;
};

type TaskGroup = <
	RegisteredTasks extends RegisteredTask[]
>(
	createTasks: (taskCreator: CreateTask) => readonly [...RegisteredTasks],
	options?: Options
) => Promise<TaskGroupAPI<TaskGroupResults<RegisteredTasks>>>;
