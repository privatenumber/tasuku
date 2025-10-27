/**
 * Using custom Ink fork (github:privatenumber/ink#built/treeshake-lodash)
 *
 * Cannot upgrade to official Ink 4+ while maintaining CommonJS support.
 * All Ink 4+ versions use top-level await (TLA), which cannot be bundled to CommonJS:
 * - Ink 4-6: `await import('./devtools.js')` in reconciler.js (line 13)
 * - Ink 5-6: yoga-layout 3.2.1 dependency uses `await loadYoga()` at module top-level
 *
 * The custom fork is based on Ink 3.2.0 (React 17) without TLA.
 *
 * To upgrade to Ink 6 + React 19, would need to drop CommonJS and ship ESM-only.
 */
import { render } from 'ink';
import React from 'react';
import type { TaskList } from '../types.js';
import TaskListApp from './TaskListApp.js';

export const createApp = (taskList: TaskList) => {
	const inkApp = render(<TaskListApp taskList={taskList} />);

	return {
		remove: () => {
			inkApp.rerender(null);
			inkApp.unmount();
			inkApp.clear();
			inkApp.cleanup();
		},
	};
};
