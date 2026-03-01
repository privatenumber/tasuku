import type { State, TaskList } from '../types.ts';

export const isTerminalState = (state: State): boolean => (
	state === 'success' || state === 'error' || state === 'warning' || state === 'skipped'
);

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
