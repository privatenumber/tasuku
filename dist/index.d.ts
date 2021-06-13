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
        <T extends task.TaskFunction>(title: string, taskFunction: T): Promise<TaskAPI<T> & {
            result: Awaited<ReturnType<T>>;
        }>;
        group<T_1 extends task.TaskFunction, Tasks extends TaskAPI<T_1>[]>(createTasks: (taskCreator: <T_2 extends task.TaskFunction>(title: string, taskFunction: T_2) => TaskAPI<T_2>) => readonly [...Tasks], options?: Options): Promise<{
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
declare type TaskAPI<T extends task.TaskFunction> = {
    run: () => Promise<Awaited<ReturnType<T>>>;
    clear: () => void;
};
declare type TaskResults<T extends task.TaskFunction, Tasks extends TaskAPI<T>[]> = {
    [key in keyof Tasks]: (Tasks[key] extends TaskAPI<T> ? Awaited<ReturnType<Tasks[key]['run']>> : Tasks[key]);
};
declare namespace task {
    type TaskFunction = (taskHelpers: ReturnType<typeof createTaskInnerApi>) => Promise<unknown>;
}
declare const task: {
    <T extends task.TaskFunction>(title: string, taskFunction: T): Promise<TaskAPI<T> & {
        result: Awaited<ReturnType<T>>;
    }>;
    group<T_1 extends task.TaskFunction, Tasks extends TaskAPI<T_1>[]>(createTasks: (taskCreator: <T_2 extends task.TaskFunction>(title: string, taskFunction: T_2) => TaskAPI<T_2>) => readonly [...Tasks], options?: Options): Promise<{
        results: TaskResults<T_1, Tasks>;
        clear(): void;
    }>;
};

export default task;
