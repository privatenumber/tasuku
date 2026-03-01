import type { TaskObject, TasukuTheme } from '../types.ts';

/**
 * Format a completed task's output and streamOutput lines.
 * Returns the formatted string (newline-terminated per line), or empty string if no output.
 */
export const formatTaskOutput = (
	task: TaskObject,
	depth: number,
	theme: TasukuTheme,
): string => {
	const outputIndent = `${'  '.repeat(depth)}  `;
	let result = '';

	if (task.output) {
		const outputColor = (
			task.state === 'error' && theme.colors.error
		) || (
			task.state === 'warning' && theme.colors.warning
		) || theme.colors.secondary;

		const lines = task.output.split('\n');
		for (let i = 0; i < lines.length; i += 1) {
			const prefix = i === 0 ? '→ ' : '';
			result += `${outputIndent}${outputColor(`${prefix}${lines[i]}`)}\n`;
		}
	}

	if (task.streamOutput) {
		const continuationIndent = `${outputIndent}   `;
		const streamLines = task.streamOutput.split('\n');
		for (let i = 0; i < streamLines.length; i += 1) {
			const indent = i === 0 ? `${outputIndent}⎿  ` : continuationIndent;
			result += `${indent}${theme.colors.secondary(streamLines[i])}\n`;
		}
		if (task.streamTruncatedLines) {
			result += `${continuationIndent}${theme.colors.secondary(`(+ ${task.streamTruncatedLines} lines)`)}\n`;
		}
	}

	return result;
};
