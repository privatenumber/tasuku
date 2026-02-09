import { Writable } from 'stream';

interface Options {
	/**
	Number of concurrently pending promises returned by `mapper`.

	Must be an integer from 1 and up or `Infinity`.

	@default Infinity
	*/
	readonly concurrency?: number;

	/**
	When `true`, the first mapper rejection will be rejected back to the consumer.

	When `false`, instead of stopping when a promise rejects, it will wait for all the promises to settle and then reject with an [aggregated error](https://github.com/sindresorhus/aggregate-error) containing all the errors from the rejected promises.

	Caveat: When `true`, any already-started async mappers will continue to run until they resolve or reject. In the case of infinite concurrency with sync iterables, *all* mappers are invoked on startup and will continue after the first rejection. [Issue #51](https://github.com/sindresorhus/p-map/issues/51) can be implemented for abort control.

	@default true
	*/
	readonly stopOnError?: boolean;

	/**
	You can abort the promises using [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

	**Requires Node.js 16 or later.*

	@example
	```
	import pMap from 'p-map';
	import delay from 'delay';

	const abortController = new AbortController();

	setTimeout(() => {
		abortController.abort();
	}, 500);

	const mapper = async value => value;

	await pMap([delay(1000), delay(1000)], mapper, {signal: abortController.signal});
	// Throws AbortError (DOMException) after 500 ms.
	```
	*/
	readonly signal?: AbortSignal;
}

type State = 'pending' | 'loading' | 'error' | 'warning' | 'success';
type TaskGroupOptions = {
    /**
     * Number of tasks to run at a time.
     *
     * Must be an integer from 1 and up or `Infinity`.
     *
     * @default 1
     */
    concurrency?: Options['concurrency'];
    /**
     * When `true`, the first task rejection will be rejected back to the consumer.
     *
     * When `false`, instead of stopping when a task rejects, it will wait for all
     * tasks to settle and then reject with an aggregated error.
     *
     * @default true
     */
    stopOnError?: Options['stopOnError'];
    /**
     * Abort signal to cancel pending tasks.
     */
    signal?: Options['signal'];
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
type TaskObject = {
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
type TaskOptions = {
    showTime?: boolean;
    previewLines?: number;
};
type TaskInnerAPI = {
    task: Task;
    setTitle(title: string): void;
    setStatus(status?: string): void;
    setWarning(warning?: Error | string): void;
    setError(error?: Error | string): void;
    setOutput(output: string | {
        message: string;
    }): void;
    streamPreview: Writable;
    startTime(): void;
    stopTime(): number;
};
type TaskFunction<T> = (innerApi: TaskInnerAPI) => Promise<T>;
declare const runSymbol: unique symbol;
type RegisteredTask<T = unknown> = {
    [runSymbol]: () => Promise<T>;
    task: TaskObject;
    clear: () => void;
};
type TaskAPI<Result = unknown> = {
    result: Result;
    state: State;
    clear: () => void;
};
type Task = (<TaskReturnType>(
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
options?: TaskOptions) => Promise<TaskAPI<TaskReturnType>>) & {
    group: TaskGroup;
};
type TaskGroupResults<RegisteredTasks extends RegisteredTask[]> = {
    [Key in keyof RegisteredTasks]: (RegisteredTasks[Key] extends RegisteredTask<infer ReturnType> ? TaskAPI<ReturnType> : unknown);
};
type TaskGroupAPI<Results = unknown[]> = Results & {
    clear(): void;
};
type CreateTask = <ReturnType>(
/**
 * The task title
 */
title: string, 
/**
 * The task function
 */
taskFunction: TaskFunction<ReturnType>) => RegisteredTask<ReturnType>;
type TaskGroup = <RegisteredTasks extends RegisteredTask[]>(createTasks: (taskCreator: CreateTask) => readonly [...RegisteredTasks], options?: TaskGroupOptions) => Promise<TaskGroupAPI<TaskGroupResults<RegisteredTasks>>>;

declare const _default: Task;

export { _default as default };
export type { Task, TaskAPI, TaskFunction, TaskGroupAPI, TaskInnerAPI, TaskOptions };
