import ansis from 'ansis';

export const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

export const hasSpinner = (output: string) => spinnerFrames.some(
	frame => output.includes(ansis.yellow(frame)),
);
