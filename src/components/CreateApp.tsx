import { render } from 'ink';
import React from 'react';
import type { TaskList } from '../types';
import TaskListApp from './TaskListApp';

export function createApp(taskList: TaskList) {
	const inkApp = render(<TaskListApp taskList={taskList} />);

	return {
		remove() {
			inkApp.rerender(null);
			inkApp.unmount();
			inkApp.clear();
			inkApp.cleanup();
		},
	};
}
