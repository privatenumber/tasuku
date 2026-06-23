import { Writable } from 'node:stream';
import type { TaskObject, StreamPreview } from '../types.ts';

export const defaultPreviewLines = 5;

export const createStreamPreview = (
	taskState: TaskObject,
	maxLines: number,
	onChange: () => void,
): StreamPreview => {
	const lines: string[] = [];
	let totalLines = 0;
	let partialLine = '';

	// Resolve \r within a string: keep content after the last \r.
	// For trailing \r (nothing after), keep the last non-empty segment.
	const resolveCarriageReturn = (text: string) => {
		const segments = text.split('\r');
		return segments.reverse().find(Boolean) ?? '';
	};

	const flush = () => {
		const displayPartial = partialLine.includes('\r')
			? resolveCarriageReturn(partialLine)
			: partialLine;
		const output = displayPartial
			? [...lines, displayPartial].join('\n')
			: lines.join('\n');
		taskState.streamOutput = output;
		taskState.streamTruncatedLines = Math.max(0, totalLines - maxLines);
		onChange();
	};

	const writable = new Writable({
		write(chunk: Buffer, _encoding, callback) {
			const text = partialLine + chunk.toString();
			const parts = text.split(/\r?\n/);

			// Last element is either empty (if chunk ended with \n) or a partial line
			partialLine = parts.pop()!;

			for (const rawLine of parts) {
				// Handle \r (carriage return) — keep content after last \r
				const line = rawLine.includes('\r')
					? resolveCarriageReturn(rawLine)
					: rawLine;
				lines.push(line);
				totalLines += 1;
				if (lines.length > maxLines) {
					lines.shift();
				}
			}

			// Trim accumulated \r segments to prevent unbounded growth
			if (partialLine.includes('\r')) {
				const resolved = resolveCarriageReturn(partialLine);
				// Keep trailing \r as boundary marker for next chunk
				partialLine = partialLine.endsWith('\r')
					? `${resolved}\r`
					: resolved;
			}

			if (parts.length > 0 || partialLine) {
				flush();
			}

			callback();
		},

		final(callback) {
			// Flush any remaining partial line
			if (partialLine) {
				const line = partialLine.includes('\r')
					? resolveCarriageReturn(partialLine)
					: partialLine;
				lines.push(line);
				totalLines += 1;
				if (lines.length > maxLines) {
					lines.shift();
				}
				partialLine = '';
				flush();
			}
			callback();
		},
	}) as StreamPreview;

	writable.clear = () => {
		lines.length = 0;
		totalLines = 0;
		partialLine = '';
		taskState.streamOutput = undefined;
		taskState.streamTruncatedLines = undefined;
		onChange();
	};

	return writable;
};
