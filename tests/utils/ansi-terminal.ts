import stripAnsi from 'strip-ansi';

/**
 * Shared ANSI terminal state machine.
 * Processes raw terminal output, maintains a rows array,
 * and calls onText after each visible text write.
 */
type StreamCallbacks = {
	onText?: (rows: string[], cursorRow: number) => void;
	onInsertLine?: (cursorRow: number) => void;
};

const processAnsiStream = (
	output: string,
	callbacks?: StreamCallbacks,
): string[] => {
	const rows: string[] = [];
	let cursorRow = 0;
	let savedRow = 0;

	const ensureRow = (row: number) => {
		while (rows.length <= row) {
			rows.push('');
		}
	};

	// eslint-disable-next-line no-control-regex -- matching ANSI escape sequences
	const segments = output.split(/(\u001B\[[0-9;]*[A-Z]|\u001B7|\u001B8|\r?\n|\r)/i);

	for (const segment of segments) {
		switch (segment) {
			case '\n':
			case '\r\n': {
				cursorRow += 1;
				ensureRow(cursorRow);

				break;
			}
			case '\r': {
				ensureRow(cursorRow);
				rows[cursorRow] = '';

				break;
			}
			case '\u001B7': {
				savedRow = cursorRow;

				break;
			}
			case '\u001B8': {
				cursorRow = savedRow;

				break;
			}
			default: { if (segment.startsWith('\u001B[')) {
			// eslint-disable-next-line no-control-regex -- matching ANSI escape sequences
				const match = segment.match(/\u001B\[([0-9;]*)([A-Z])/i);
				if (match) {
					const parameter = Number.parseInt(match[1] || '1', 10) || 1;
					switch (match[2]) {
						case 'A': { cursorRow = Math.max(0, cursorRow - parameter); break; }
						case 'B': { cursorRow += parameter; ensureRow(cursorRow); break; }
						case 'J': { ensureRow(cursorRow); rows[cursorRow] = ''; rows.length = cursorRow + 1; break; }
						case 'K': { ensureRow(cursorRow); rows[cursorRow] = ''; break; }
						case 'L': { ensureRow(cursorRow); rows.splice(cursorRow, 0, ''); callbacks?.onInsertLine?.(cursorRow); break; }
						case 's': { savedRow = cursorRow; break; }
						case 'u': { cursorRow = savedRow; break; }
						default: { break; }
					}
				}
			} else {
				const text = stripAnsi(segment);
				if (text) {
					ensureRow(cursorRow);
					rows[cursorRow] += text;
					callbacks?.onText?.(rows, cursorRow);
				}
			}
			}
		}
	}

	return rows;
};

/**
 * Check that each task title only appears on one row throughout the output.
 * Detects cursor corruption where one renderer overwrites another's row.
 */
export const checkRowOwnership = (
	output: string,
	taskTitles: string[],
): { valid: boolean;
	violation?: string; } => {
	const rowOwner = new Map<number, string>();
	let violation: string | undefined;

	const rows = processAnsiStream(output, {
		onInsertLine: (cursorRow) => {
			const shifted = new Map<number, string>();
			for (const [row, owner] of rowOwner) {
				shifted.set(row >= cursorRow ? row + 1 : row, owner);
			}
			rowOwner.clear();
			for (const [row, owner] of shifted) {
				rowOwner.set(row, owner);
			}
		},
		onText: (currentRows, cursorRow) => {
			if (violation) {
				return;
			}

			const content = currentRows[cursorRow] || '';
			const titlesInRow = taskTitles.filter(title => content.includes(title));

			if (titlesInRow.length === 0) {
				return;
			}

			const currentOwner = rowOwner.get(cursorRow);
			if (currentOwner === undefined) {
				rowOwner.set(cursorRow, titlesInRow[0]);
				return;
			}

			for (const title of titlesInRow) {
				if (title !== currentOwner) {
					violation = `Row ${cursorRow} owned by "${currentOwner}" was overwritten with "${title}" — content: "${content}"`;
					return;
				}
			}
		},
	});

	if (!violation) {
		for (const title of taskTitles) {
			if (!rows.some(row => row.includes(title))) {
				violation = `Task "${title}" not found in any row`;
				break;
			}
		}
	}

	return violation
		? {
			valid: false,
			violation,
		}
		: { valid: true };
};

/**
 * Parse raw ANSI output and return the final visible terminal grid.
 * Each row is stripped of ANSI codes — plain text only.
 * Trailing empty rows are removed.
 */
export const getTerminalGrid = (output: string): string[] => {
	const rows = processAnsiStream(output);

	while (rows.length > 0 && rows.at(-1) === '') {
		rows.pop();
	}

	return rows;
};
