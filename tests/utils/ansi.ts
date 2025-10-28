export type AnsiCodes = {
	moveCursorUp: string[];
	clearLine: string[];
	hideCursor: string[];
	showCursor: string[];
	colors: {
		green: string[];
		cyan: string[];
		yellow: string[];
		red: string[];
		dim: string[];
		reset: string[];
	};
};

// eslint-disable-next-line complexity -- ANSI code extraction requires multiple regex patterns
export const extractAnsiCodes = (output: string): AnsiCodes => ({
	// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
	moveCursorUp: output.match(/\u001B\[1A/g) || [],
	// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
	clearLine: output.match(/\u001B\[2K/g) || [],
	// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
	hideCursor: output.match(/\u001B\[\?25l/g) || [],
	// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
	showCursor: output.match(/\u001B\[\?25h/g) || [],
	colors: {
		// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
		green: output.match(/\u001B\[32m/g) || [],
		// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
		cyan: output.match(/\u001B\[36m/g) || [],
		// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
		yellow: output.match(/\u001B\[33m/g) || [],
		// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
		red: output.match(/\u001B\[31m/g) || [],
		// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
		dim: output.match(/\u001B\[2m/g) || [],
		// eslint-disable-next-line no-control-regex -- Intentionally matching ANSI escape sequences
		reset: output.match(/\u001B\[0m/g) || [],
	},
});

export const hasAnsiClearCodes = (writes: string[]): boolean => writes.some(write => write.includes('\u001B[1A') || write.includes('\u001B[2K'));

export const hasColor = (write: string, colorCode: string): boolean => write.includes(colorCode);
