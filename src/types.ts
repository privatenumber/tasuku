import type { Options } from 'p-map';

// From: https://github.com/microsoft/TypeScript/blob/4f5b3299fee9a54b692aba9df7a9e894bd86e81d/src/lib/es2015.promise.d.ts#L1
type Awaited<T> = (
	T extends undefined
		? T
		: (
			T extends PromiseLike<infer U>
				? U
				: T
		)
);

export type TaskObject = {
	title: string;
	state: 'pending' | 'loading' | 'error' | 'warning' | 'success';
	children: TaskObject[];
	status?: string;
	output?: string;
}

export type TaskList = TaskObject[] & {
	isRoot?: boolean;
}

export type TaskInnerApi = {
	task: Task;
	setTitle(title: string): void;
	setStatus(status: string): void;
	setOutput(output: string | { message: string }): void;
	setWarning(warning: Error | string): void;
	setError(error: Error| string): void;
};

export type TaskFunction = (innerApi: TaskInnerApi) => Promise<any>;

export type RegisteredTask<T extends TaskFunction> = {
	run: () => Promise<Awaited<ReturnType<T>>>;
	clear: () => void;
};

export type CreateTask = <T extends TaskFunction>(
	title: string,
	taskFunction: T,
) => RegisteredTask<T>

export type TaskAPI<Result = any> = {
	result: Result;
	clear: () => void;
}

export type Task = (
	<T extends TaskFunction>(
		title: string,
		taskFunction: T
	) => Promise<TaskAPI<Awaited<ReturnType<T>>>>
) & { group: TaskGroup }

type TaskGroupResults<
	T extends TaskFunction,
	Tasks extends RegisteredTask<T>[]
> = {
	[key in keyof Tasks]: (
		Tasks[key] extends RegisteredTask<T>
			? Awaited<ReturnType<Tasks[key]['run']>>
			: Tasks[key]
	);
};

export type TaskGroupAPI<Results = any> = {
	results: Results;
	clear(): void;
}

type TaskGroup = <
	T extends TaskFunction,
	Tasks extends RegisteredTask<T>[]
>(
	createTasks: (taskCreator: CreateTask) => readonly [...Tasks],
	options?: Options
) => Promise<TaskGroupAPI<TaskGroupResults<T, Tasks>>>;
