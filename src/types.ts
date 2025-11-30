import type { Options as PMapOptions } from 'p-map';

type State = 'pending' | 'loading' | 'error' | 'warning' | 'success';

export type TaskGroupOptions = {

	/**
	 * Number of tasks to run at a time.
	 *
	 * Must be an integer from 1 and up or `Infinity`.
	 *
	 * @default 1
	 */
	concurrency?: PMapOptions['concurrency'];

	/**
	 * When `true`, the first task rejection will be rejected back to the consumer.
	 *
	 * When `false`, instead of stopping when a task rejects, it will wait for all
	 * tasks to settle and then reject with an aggregated error.
	 *
	 * @default true
	 */
	stopOnError?: PMapOptions['stopOnError'];

	/**
	 * Abort signal to cancel pending tasks.
	 */
	signal?: PMapOptions['signal'];
};

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
	result: Result;
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

export type TaskGroupResults<
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

export type TaskGroup = <
	RegisteredTasks extends RegisteredTask[],
>(
	createTasks: (taskCreator: CreateTask) => readonly [...RegisteredTasks],
	options?: TaskGroupOptions,
) => Promise<TaskGroupAPI<TaskGroupResults<RegisteredTasks>>>;
