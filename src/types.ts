import type { Writable } from 'node:stream';

export type State = 'pending' | 'loading' | 'error' | 'warning' | 'success' | 'skipped';

export type TaskGroupOptions = {

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
	signal?: AbortSignal;
};

export type TaskList = TaskObject[] & {
	isRoot?: boolean;
};

export type StreamPreview = Writable & {
	clear(): void;
};

export type TaskInnerAPI = {
	signal: AbortSignal;
	setTitle(title: string): void;
	setStatus(status?: string): void;
	setWarning(warning?: Error | string | false | null): void;
	setError(error?: Error | string | false | null): void;
	setOutput(output: string | { message: string }): void;
	skip(message?: string): never;
	streamPreview: StreamPreview;
	startTime(): void;
	stopTime(): number;
};

export type TaskFunction<T> = (innerApi: TaskInnerAPI) => Promise<T>;

export type RegisteredTask<T = unknown> = {
	run: (signal?: AbortSignal) => Promise<T>;
	task: TaskObject;
	clear: () => void;
};

export type TaskPromise<T = unknown> = Promise<T> & {
	state: State;
	warning: string | undefined;
	error: string | undefined;
	skipped: string | undefined;
	clear: () => TaskPromise<T>;
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
	) => TaskPromise<TaskReturnType>
) & { group: TaskGroup };

export type TaskGroupResults<
	RegisteredTasks extends RegisteredTask[],
> = {
	[Key in keyof RegisteredTasks]: (
		RegisteredTasks[Key] extends RegisteredTask<infer ReturnType>
			? ReturnType
			: unknown
	);
};

export type TaskGroupPromise<Results = unknown[]> = Promise<Results> & {
	clear(): TaskGroupPromise<Results>;
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

	/**
	 * Task options
	 */
	options?: TaskOptions,
) => RegisteredTask<ReturnType>;

export type TaskGroup = <
	RegisteredTasks extends RegisteredTask[],
>(
	createTasks: (taskCreator: CreateTask) => readonly [...RegisteredTasks],
	options?: TaskGroupOptions,
) => TaskGroupPromise<TaskGroupResults<RegisteredTasks>>;

export type ColorFunction = (text: string) => string;

export type TasukuIcons = {
	pending: string;
	success: string;
	error: string;
	warning: string;
	skipped: string;
	parent: string;
	parentError: string;
};

export type TasukuColors = {
	title?: (text: string, state: State, frame: number) => string;
	dim: ColorFunction;
	secondary: ColorFunction;
	error?: ColorFunction;
	warning?: ColorFunction;
};

export type TasukuTheme = {
	spinner: string[];
	spinnerInterval?: number;
	icons: TasukuIcons;
	colors: TasukuColors;
};

export type Renderer = {
	triggerRender: () => void;
	flushRender: (force?: boolean) => void;
	renderFinal: () => void;
	destroy: () => void;
	setMaxVisible: (limit?: number | ((terminalHeight: number) => number)) => void;
};

export type RendererFactory = (
	taskList: TaskList,
	outputStream: NodeJS.WriteStream,
	theme: TasukuTheme,
) => Renderer;

export type CreateTasukuOptions = {
	theme: TasukuTheme;
	renderer: RendererFactory;
	outputStream?: NodeJS.WriteStream;
};
