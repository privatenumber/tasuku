interface Options {
	/**
	Number of concurrently pending promises returned by `mapper`.

	Must be an integer from 1 and up or `Infinity`.

	@default Infinity
	*/
	readonly concurrency?: number;

	/**
	When set to `false`, instead of stopping when a promise rejects, it will wait for all the promises to settle and then reject with an [aggregated error](https://github.com/sindresorhus/aggregate-error) containing all the errors from the rejected promises.

	@default true
	*/
	readonly stopOnError?: boolean;
}

declare type TaskObject = {
    title: string;
    state: 'pending' | 'loading' | 'error' | 'warning' | 'success';
    children: TaskObject[];
    status?: string;
    output?: string;
};
declare type Awaited<T> = (T extends undefined ? T : (T extends PromiseLike<infer U> ? U : T));

declare const createTaskInnerApi: (taskState: TaskObject) => {
    task: {
        <T extends TaskFunction>(title: string, taskFunction: T): Promise<TaskApi<T> & {
            result: Awaited<ReturnType<T>>;
        }>;
        group<T_1 extends TaskFunction, Tasks extends TaskApi<T_1>[]>(createTasks: (taskCreator: <T_2 extends TaskFunction>(title: string, taskFunction: T_2) => TaskApi<T_2>) => readonly [...Tasks], options?: Options): Promise<{
            results: TaskResults<T_1, Tasks>;
            clear(): void;
        }>;
    };
    setTitle(title: string): void;
    setStatus(status: string): void;
    setOutput(output: string | {
        message: string;
    }): void;
    setWarning(warning: Error | string): void;
    setError(error: Error | string): void;
};
declare type TaskInnerApi = ReturnType<typeof createTaskInnerApi>;
declare type TaskFunction = (taskHelpers: TaskInnerApi) => Promise<unknown>;
declare type TaskApi<T extends TaskFunction> = {
    run: () => Promise<Awaited<ReturnType<T>>>;
    clear: () => void;
};
declare type TaskResults<T extends TaskFunction, Tasks extends TaskApi<T>[]> = {
    [key in keyof Tasks]: (Tasks[key] extends TaskApi<T> ? Awaited<ReturnType<Tasks[key]['run']>> : Tasks[key]);
};
declare const _default: {
    <T extends TaskFunction>(title: string, taskFunction: T): Promise<TaskApi<T> & {
        result: Awaited<ReturnType<T>>;
    }>;
    group<T_1 extends TaskFunction, Tasks extends TaskApi<T_1>[]>(createTasks: (taskCreator: <T_2 extends TaskFunction>(title: string, taskFunction: T_2) => TaskApi<T_2>) => readonly [...Tasks], options?: Options): Promise<{
        results: TaskResults<T_1, Tasks>;
        clear(): void;
    }>;
};

export { TaskFunction, TaskInnerApi, _default as default };
