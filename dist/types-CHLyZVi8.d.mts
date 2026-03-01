import { Writable } from 'node:stream';

type State = 'pending' | 'loading' | 'error' | 'warning' | 'success' | 'skipped';
type TaskGroupOptions = {
    /**
     * Number of tasks to run at a time.
     *
     * Must be an integer from 1 and up or `Infinity`.
     *
     * @default 1
     */
    concurrency?: number;
    /**
     * When `true`, the first task rejection will be rejected back to the consumer.
     *
     * When `false`, instead of stopping when a task rejects, it will wait for all
     * tasks to settle and then reject with an aggregated error.
     *
     * @default true
     */
    stopOnError?: boolean;
    /**
     * Abort signal to cancel pending tasks.
     */
    signal?: AbortSignal;
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
    signal?: AbortSignal;
};
type TaskList = TaskObject[] & {
    isRoot?: boolean;
};
type StreamPreview = Writable & {
    clear(): void;
};
type TaskInnerAPI = {
    signal: AbortSignal;
    setTitle(title: string): void;
    setStatus(status?: string): void;
    setWarning(warning?: Error | string | false | null): void;
    setError(error?: Error | string | false | null): void;
    setOutput(output: string | {
        message: string;
    }): void;
    skip(message?: string): never;
    streamPreview: StreamPreview;
    startTime(): void;
    stopTime(): number;
};
type TaskFunction<T> = (innerApi: TaskInnerAPI) => Promise<T>;
type RegisteredTask<T = unknown> = {
    run: (signal?: AbortSignal) => Promise<T>;
    task: TaskObject;
    clear: () => void;
};
type TaskPromise<T = unknown> = Promise<T> & {
    state: State;
    warning: string | undefined;
    error: string | undefined;
    skipped: string | undefined;
    clear: () => TaskPromise<T>;
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
options?: TaskOptions) => TaskPromise<TaskReturnType>) & {
    group: TaskGroup;
};
type TaskGroupResults<RegisteredTasks extends RegisteredTask[]> = {
    [Key in keyof RegisteredTasks]: (RegisteredTasks[Key] extends RegisteredTask<infer ReturnType> ? ReturnType : unknown);
};
type TaskGroupPromise<Results = unknown[]> = Promise<Results> & {
    clear(): TaskGroupPromise<Results>;
};
type CreateTask = <ReturnType>(
/**
 * The task title
 */
title: string, 
/**
 * The task function
 */
taskFunction: TaskFunction<ReturnType>, 
/**
 * Task options
 */
options?: TaskOptions) => RegisteredTask<ReturnType>;
type TaskGroup = <RegisteredTasks extends RegisteredTask[]>(createTasks: (taskCreator: CreateTask) => readonly [...RegisteredTasks], options?: TaskGroupOptions) => TaskGroupPromise<TaskGroupResults<RegisteredTasks>>;
type ColorFunction = (text: string) => string;
type TasukuIcons = {
    pending: string;
    success: string;
    error: string;
    warning: string;
    skipped: string;
    parent: string;
    parentError: string;
};
type TasukuColors = {
    title?: (text: string, state: State, frame: number) => string;
    dim: ColorFunction;
    secondary: ColorFunction;
    error?: ColorFunction;
    warning?: ColorFunction;
};
type TasukuTheme = {
    spinner: string[];
    spinnerInterval?: number;
    icons: TasukuIcons;
    colors: TasukuColors;
};
type Renderer = {
    triggerRender: () => void;
    flushRender: (force?: boolean) => void;
    renderFinal: () => void;
    destroy: () => void;
    setMaxVisible: (limit?: number | ((terminalHeight: number) => number)) => void;
};
type RendererFactory = (taskList: TaskList, outputStream: NodeJS.WriteStream, theme: TasukuTheme) => Renderer;
type CreateTasukuOptions = {
    theme: TasukuTheme;
    renderer: RendererFactory;
    outputStream?: NodeJS.WriteStream;
};

export type { CreateTasukuOptions as C, Renderer as R, State as S, Task as T, RendererFactory as a, TaskFunction as b, TaskGroupPromise as c, TaskInnerAPI as d, TaskOptions as e, TaskPromise as f, TasukuTheme as g };
