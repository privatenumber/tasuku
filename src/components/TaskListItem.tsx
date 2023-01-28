import React, { type FC } from 'react';
import { Task } from 'ink-task-list';
import type { TaskObject } from '../types.js';

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

// From: https://github.com/sindresorhus/cli-spinners/blob/00de8fbeee16fa49502fa4f687449f70f2c8ca2c/spinners.json#L2
const spinner = {
	interval: 80,
	frames: [
		'⠋',
		'⠙',
		'⠹',
		'⠸',
		'⠼',
		'⠴',
		'⠦',
		'⠧',
		'⠇',
		'⠏',
	],
};

const TaskListItem: FC<{
	task: DeepReadonly<TaskObject>;
}> = ({
	task,
}) => {
	const childTasks = (
		task.children.length > 0
			? task.children.map((childTask, index) => (
				<TaskListItem
					key={index}
					task={childTask}
				/>
			))
			: []
	);

	return (
		<Task
			state={task.state}
			label={task.title}
			status={task.status}
			spinner={spinner}
			output={task.output}
			isExpanded={childTasks.length > 0}
		>
			{childTasks}
		</Task>
	);
};

export default TaskListItem;
