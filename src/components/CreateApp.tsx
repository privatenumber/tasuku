import { render } from 'ink';
import React from 'react';
import type { TaskList } from '../types.js';
import TaskListApp from './TaskListApp.js';

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
