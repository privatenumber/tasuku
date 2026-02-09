import type { Writable } from 'node:stream';
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

	/**
	 * Maximum number of lines to display in the task list.
	 *
	 * Can be a number or a function that returns a number (called on each render).
	 * When there are more task lines than this limit, remaining tasks
	 * are hidden with a state breakdown summary.
	 *
	 * @default Responsive to terminal height (rows - 2, minimum 5)
	 */
	maxVisible?: number | ((terminalHeight: number) => number);
};

export type TaskObject = {
	title: string;
	state: State;
	children: TaskObject[];
	status?: string;
	output?: string;
	streamOutput?: string;
	streamTruncatedLines?: number;
	startedAt?: number;
	elapsedMs?: number;
};

export type TaskOptions = {
	showTime?: boolean;
	previewLines?: number;
};

export type TaskList = TaskObject[] & {
	isRoot?: boolean;
};

export type TaskInnerAPI = {
	task: Task;
	setTitle(title: string): void;
	setStatus(status?: string): void;
	setWarning(warning?: Error | string | false | null): void;
	setError(error?: Error | string | false | null): void;
	setOutput(output: string | { message: string }): void;
	streamPreview: Writable;
	startTime(): void;
	stopTime(): number;
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
	warning: string | undefined;
	error: string | undefined;
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

		/**
		 * Task options
		 */
		options?: TaskOptions,
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
