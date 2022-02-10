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
}

declare type TaskInnerAPI = {
    task: Task;
    setTitle(title: string): void;
    setStatus(status: string): void;
    setOutput(output: string | {
        message: string;
    }): void;
    setWarning(warning: Error | string): void;
    setError(error: Error | string): void;
};
declare type TaskFunction<T> = (innerApi: TaskInnerAPI) => Promise<T>;
declare const runSymbol: unique symbol;
declare type RegisteredTask<T = any> = {
    [runSymbol]: () => Promise<T>;
    clear: () => void;
};
declare type TaskAPI<Result = any> = {
    result: Result;
    clear: () => void;
};
declare type Task = (<TaskReturnType>(
/**
 * The task title
 */
title: string, 
/**
 * The task function
 */
taskFunction: TaskFunction<TaskReturnType>) => Promise<TaskAPI<TaskReturnType>>) & {
    group: TaskGroup;
};
declare type TaskGroupResults<RegisteredTasks extends RegisteredTask[]> = {
    [Key in keyof RegisteredTasks]: (RegisteredTasks[Key] extends RegisteredTask<infer ReturnType> ? ReturnType : unknown);
};
declare type TaskGroupAPI<Results = any> = {
    results: Results;
    clear(): void;
};
declare type CreateTask = <ReturnType>(
/**
 * The task title
 */
title: string, 
/**
 * The task function
 */
taskFunction: TaskFunction<ReturnType>) => RegisteredTask<ReturnType>;
declare type TaskGroup = <RegisteredTasks extends RegisteredTask[]>(createTasks: (taskCreator: CreateTask) => readonly [...RegisteredTasks], options?: Options) => Promise<TaskGroupAPI<TaskGroupResults<RegisteredTasks>>>;

declare const _default: Task;

export { Task, TaskAPI, TaskFunction, TaskGroupAPI, TaskInnerAPI, _default as default };
