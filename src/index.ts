import {
	green, red, yellow, gray, dim,
} from 'ansis';
import { createTasuku } from './create-tasuku.js';
import type { TasukuTheme } from './types.js';

export const theme: TasukuTheme = {
	spinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(frame => yellow(frame)),
	icons: {
		pending: gray('◼'),
		success: green('✔'),
		error: red('✖'),
		warning: yellow('⚠'),
		parent: yellow('❯'),
		parentError: red('❯'),
	},
	colors: {
		dim,
		secondary: gray,
	},
};

export { createTasuku } from './create-tasuku.js';

export default createTasuku(theme);

export type {
	State,
	Task,
	TaskPromise,
	TaskInnerAPI,
	TaskFunction,
	TaskGroupPromise,
	TaskOptions,
	TasukuTheme,
} from './types.js';
