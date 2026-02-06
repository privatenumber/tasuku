import stringWidth from 'string-width';

/**
 * Calculate visual line count accounting for terminal width and line wrapping.
 * Uses string-width to handle fullwidth Unicode and strip ANSI codes.
 */
export const getVisualLineCount = (output: string, columns: number | undefined): number => {
	const lines = output.split('\n');
	// Exclude trailing empty string from split
	const lineCount = lines.length - 1;

	if (!columns) {
		return lineCount;
	}

	let count = 0;
	for (let i = 0; i < lineCount; i += 1) {
		const lineWidth = stringWidth(lines[i]);
		// Each line takes at least 1 row, plus extra rows for wrapping
		count += Math.max(1, Math.ceil(lineWidth / columns));
	}
	return count;
};
