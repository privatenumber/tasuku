import stringWidth from 'string-width';

/**
 * Truncate a styled line to fit within a column limit.
 * Uses string-width for accurate visual width (CJK, emoji, ANSI).
 *
 * Walks the string, skipping ANSI escape sequences (CSI, OSC, DCS, APC,
 * PM, SOS, charset designation, and two-byte ESC), and measuring visible
 * characters with string-width.
 */
export const truncateLine = (line: string, columns: number): string => {
	let visibleWidth = 0;
	let result = '';
	let i = 0;

	while (i < line.length) {
		const char = line[i];

		if (char === '\u001B' && i + 1 < line.length) {
			const next = line[i + 1];

			switch (next) {
				case '[': {
					// CSI sequence: ESC [ params final_byte (0x40-0x7E)
					// Consume ESC [ first, then scan for final byte
					result += char + next;
					i += 2;
					while (i < line.length) {
						result += line[i];
						if (line[i] >= '@' && line[i] <= '~') {
							break;
						}
						i += 1;
					}
					break;
				}

				case ']':
				case 'P':
				case '_':
				case '^':
				case 'X': {
					// String sequences terminated by ST (BEL or ESC \):
					// OSC (ESC ]), DCS (ESC P), APC (ESC _), PM (ESC ^), SOS (ESC X)
					result += char + next;
					i += 2;
					while (i < line.length) {
						result += line[i];
						if (line[i] === '\u0007') {
							break;
						}
						if (line[i] === '\u001B' && i + 1 < line.length && line[i + 1] === '\\') {
							result += line[i + 1];
							i += 1;
							break;
						}
						i += 1;
					}
					break;
				}

				case '(':
				case ')':
				case '*':
				case '+': {
					// Charset designation: ESC ( X, ESC ) X, ESC * X, ESC + X (3 bytes)
					result += char + next;
					i += 2;
					if (i < line.length) {
						result += line[i];
					}
					break;
				}

				default: {
					// Two-byte ESC sequence (ESC 7, ESC 8, ESC c, etc.)
					result += char + next;
					i += 1;
					break;
				}
			}
		} else {
			const charWidth = stringWidth(char);
			if (visibleWidth + charWidth > columns) {
				break;
			}
			result += char;
			visibleWidth += charWidth;
		}

		i += 1;
	}

	return result;
};
