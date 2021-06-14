import { Options } from 'p-map';

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
        <T extends task.TaskFunction>(title: string, taskFunction: T): Promise<TaskApi<T> & {
            result: Awaited<ReturnType<T>>;
        }>;
        group<T_1 extends task.TaskFunction, Tasks extends TaskApi<T_1>[]>(createTasks: (taskCreator: <T_2 extends task.TaskFunction>(title: string, taskFunction: T_2) => TaskApi<T_2>) => readonly [...Tasks], options?: Options): Promise<{
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
declare type TaskApi<T extends task.TaskFunction> = {
    run: () => Promise<Awaited<ReturnType<T>>>;
    clear: () => void;
};
declare type TaskResults<T extends task.TaskFunction, Tasks extends TaskApi<T>[]> = {
    [key in keyof Tasks]: (Tasks[key] extends TaskApi<T> ? Awaited<ReturnType<Tasks[key]['run']>> : Tasks[key]);
};
declare namespace task {
    type TaskInnerApi = ReturnType<typeof createTaskInnerApi>;
    type TaskFunction = (taskHelpers: TaskInnerApi) => Promise<unknown>;
}
declare const task: {
    <T extends task.TaskFunction>(title: string, taskFunction: T): Promise<TaskApi<T> & {
        result: Awaited<ReturnType<T>>;
    }>;
    group<T_1 extends task.TaskFunction, Tasks extends TaskApi<T_1>[]>(createTasks: (taskCreator: <T_2 extends task.TaskFunction>(title: string, taskFunction: T_2) => TaskApi<T_2>) => readonly [...Tasks], options?: Options): Promise<{
        results: TaskResults<T_1, Tasks>;
        clear(): void;
    }>;
};

export default task;
