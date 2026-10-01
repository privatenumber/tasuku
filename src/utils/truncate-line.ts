import { cachedStringWidth } from './cached-string-width.ts';

const graphemes = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

/**
 * Truncate a styled line to fit within a column limit.
 * Uses string-width for accurate visual width (CJK, emoji, ANSI).
 *
 * Walks the string, skipping ANSI escape sequences (CSI, OSC, DCS, APC,
 * PM, SOS, charset designation, and two-byte ESC), and measuring visible
 * grapheme clusters with string-width so emoji and combining sequences stay whole.
 */
export const truncateLine = (line: string, columns: number): string => {
	let text = '';
	const textOffsets: number[] = [];
	let i = 0;

	while (i < line.length) {
		const char = line[i];

		if (char === '\u001B' && i + 1 < line.length) {
			const next = line[i + 1];

			switch (next) {
				case '[': {
					// CSI sequence: ESC [ params final_byte (0x40-0x7E)
					// Consume ESC [ first, then scan for final byte
					i += 2;
					while (i < line.length) {
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
					i += 2;
					while (i < line.length) {
						if (line[i] === '\u0007') {
							break;
						}
						if (line[i] === '\u001B' && i + 1 < line.length && line[i + 1] === '\\') {
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
					i += 2;
					break;
				}

				default: {
					// Two-byte ESC sequence (ESC 7, ESC 8, ESC c, etc.)
					i += 1;
					break;
				}
			}
		} else {
			textOffsets.push(i);
			text += char;
		}

		i += 1;
	}

	let visibleWidth = 0;
	let result = '';
	let sourceOffset = 0;
	// Apply escapes at grapheme boundaries so terminal shaping and width agree.
	for (const { segment, index } of graphemes.segment(text)) {
		const width = cachedStringWidth(segment);
		if (visibleWidth + width > columns) {
			return result + line.slice(sourceOffset, textOffsets[index]);
		}
		for (let offset = index; offset < index + segment.length; offset += 1) {
			result += line.slice(sourceOffset, textOffsets[offset]);
			sourceOffset = textOffsets[offset] + 1;
		}
		result += segment;
		visibleWidth += width;
	}
	return result + line.slice(sourceOffset);
};
