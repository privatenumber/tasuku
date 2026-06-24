import {
	green, red, yellow, gray, dim,
} from 'ansis';

// Internal styling constants. Used directly by renderers and format
// utilities. Not part of the public API — themed customization may
// return in a later release, but for v3.0 the styling is fixed.

export const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map(frame => yellow(frame));

export const spinnerInterval = 80;

export const icons = {
	pending: gray('◼'),
	success: green('✔'),
	error: red('✖'),
	warning: yellow('⚠'),
	skipped: gray('⊘'),
	parent: yellow('❯'),
	parentError: red('❯'),
};

export const colors = {
	dim,
	secondary: gray,
	error: red,
	warning: yellow,
};
