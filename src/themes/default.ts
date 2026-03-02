import {
	green, red, yellow, gray, dim,
} from 'ansis';
import type { TasukuTheme } from '../types.ts';

export const theme: TasukuTheme = {
	spinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(frame => yellow(frame)),
	icons: {
		pending: gray('◼'),
		success: green('✔'),
		error: red('✖'),
		warning: yellow('⚠'),
		skipped: gray('⊘'),
		parent: yellow('❯'),
		parentError: red('❯'),
	},
	colors: {
		dim,
		secondary: gray,
		error: red,
		warning: yellow,
	},
};
