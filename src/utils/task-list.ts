import type { TaskList } from '../types.js';

export const areAllTasksDone = (tasks: TaskList): boolean => {
	for (const task of tasks) {
		if (task.state === 'loading' || task.state === 'pending') {
			return false;
		}
		if (task.children && task.children.length > 0 && !areAllTasksDone(task.children)) {
			return false;
		}
	}
	return true;
};
