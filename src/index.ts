import {
	green, red, yellow, gray, dim,
} from 'ansis';
import { createTasuku } from './create-tasuku.ts';
import { pinned } from './renderers/pinned.ts';
import type { TasukuTheme } from './types.ts';

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

export { createTasuku } from './create-tasuku.ts';
export { pinned } from './renderers/pinned.ts';
export { inline } from './renderers/inline.ts';

export default createTasuku({
	renderer: pinned,
	theme,
});

export type {
	State,
	Task,
	TaskPromise,
	TaskInnerAPI,
	TaskFunction,
	TaskGroupPromise,
	TaskOptions,
	TasukuTheme,
	CreateTasukuOptions,
	Renderer,
	RendererFactory,
} from './types.ts';
