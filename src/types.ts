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

// From: https://github.com/microsoft/TypeScript/blob/4f5b3299fee9a54b692aba9df7a9e894bd86e81d/src/lib/es2015.promise.d.ts#L1
export type Awaited<T> = (
	T extends undefined
		? T
		: (
			T extends PromiseLike<infer U>
				? U
				: T
		)
);
