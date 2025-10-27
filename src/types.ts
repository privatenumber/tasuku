import type { Options } from 'p-map';

type State = 'pending' | 'loading' | 'error' | 'warning' | 'success';

export type TaskObject = {
	title: string;
	state: State;
	children: TaskObject[];
	status?: string;
	output?: string;
};

export type TaskList = TaskObject[] & {
	isRoot?: boolean;
};

export type TaskInnerAPI = {
	task: Task;
	setTitle(title: string): void;
	setStatus(status?: string): void;
	setWarning(warning?: Error | string): void;
	setError(error?: Error | string): void;
	setOutput(output: string | { message: string }): void;
};

export type TaskFunction<T> = (innerApi: TaskInnerAPI) => Promise<T>;

export const runSymbol: unique symbol = Symbol('run');

export type RegisteredTask<T = unknown> = {
	[runSymbol]: () => Promise<T>; // ReturnType<TaskFunction<T>>;
	task: TaskObject;
	clear: () => void;
};

export type TaskAPI<Result = unknown> = {
	result: Result | undefined;
	state: State;
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
		taskFunction: TaskFunction<TaskReturnType>,
	) => Promise<TaskAPI<TaskReturnType>>
) & { group: TaskGroup };

type TaskGroupResults<
	RegisteredTasks extends RegisteredTask[],
> = {
	[Key in keyof RegisteredTasks]: (
		RegisteredTasks[Key] extends RegisteredTask<infer ReturnType>
			? TaskAPI<ReturnType>
			: unknown
	);
};

export type TaskGroupAPI<Results = unknown[]> = Results & {
	clear(): void;
};

export type CreateTask = <ReturnType>(

	/**
	 * The task title
	 */
	title: string,

	/**
	 * The task function
	 */
	taskFunction: TaskFunction<ReturnType>,
) => RegisteredTask<ReturnType>;

type TaskGroup = <
	RegisteredTasks extends RegisteredTask[],
>(
	createTasks: (taskCreator: CreateTask) => readonly [...RegisteredTasks],
	options?: Options,
) => Promise<TaskGroupAPI<TaskGroupResults<RegisteredTasks>>>;
