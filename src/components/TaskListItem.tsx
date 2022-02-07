import React, { FC } from 'react';
import { Task } from 'ink-task-list';
import type { TaskObject } from '../types';

const TaskListItem: FC<{
	task: TaskObject;
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
			output={task.output}
			isExpanded={childTasks.length > 0}
		>
			{childTasks}
		</Task>
	);
};

export default TaskListItem;
