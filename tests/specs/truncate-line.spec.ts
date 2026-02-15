import { describe, test, expect } from 'manten';
import { truncateLine } from '../../src/utils/truncate-line.ts';

describe('truncateLine', () => {
	test('plain ASCII text truncates at column limit', () => {
		expect(truncateLine('Hello, world!', 5)).toBe('Hello');
	});

	test('returns full string when under limit', () => {
		expect(truncateLine('Hi', 10)).toBe('Hi');
	});

	test('preserves ANSI SGR sequences without counting width', () => {
		// \u001B[32m = green, \u001B[39m = reset fg
		const styled = '\u001B[32m✔\u001B[39m Task';
		expect(truncateLine(styled, 6)).toBe(styled);
	});

	test('truncates styled text by visible width', () => {
		const styled = '\u001B[32mHello World\u001B[39m';
		const result = truncateLine(styled, 5);
		// Trailing reset is past the truncation point — not included
		expect(result).toBe('\u001B[32mHello');
	});

	test('CJK characters count as width 2', () => {
		// 漢字 = two CJK chars, each width 2 = total visible width 4
		expect(truncateLine('漢字OK', 4)).toBe('漢字');
		expect(truncateLine('漢字OK', 3)).toBe('漢');
		expect(truncateLine('漢字OK', 2)).toBe('漢');
	});

	test('emoji characters count as width 2', () => {
		expect(truncateLine('🎉 Done', 3)).toBe('🎉 ');
		expect(truncateLine('🎉 Done', 2)).toBe('🎉');
	});

	test('mixed CJK and ASCII with ANSI', () => {
		const styled = '\u001B[33m⠋\u001B[39m タスク running';
		// ⠋(1) + space(1) + タ(2) + ス(2) + ク(2) = 8 visible width
		expect(truncateLine(styled, 8)).toBe('\u001B[33m⠋\u001B[39m タスク');
	});

	test('preserves two-byte ESC sequences', () => {
		// ESC 7 (cursor save) should be preserved without counting width
		const line = '\u001B7Hello\u001B8';
		expect(truncateLine(line, 5)).toBe(line);
	});

	test('preserves OSC sequences', () => {
		// OSC 8 hyperlink: ESC ] 8 ; ; url ST text ESC ] 8 ; ; ST
		const link = '\u001B]8;;https://example.com\u001B\\Click\u001B]8;;\u001B\\';
		expect(truncateLine(link, 5)).toBe(link);
	});

	test('preserves G0 charset designation (3-byte ESC sequence)', () => {
		// ESC ( 0 = DEC Special Graphics, ESC ( B = ASCII
		// Draw a box using DEC line drawing: lqqk = ┌──┐
		const line = '\u001B(0lqqk\u001B(B';
		// 4 visible chars (l, q, q, k) — the ESC sequences have zero width
		expect(truncateLine(line, 4)).toBe(line);
	});

	test('does not count charset designator byte as visible width', () => {
		// ESC ( 0 then "Hello" — only "Hello" (5) should count as visible
		const line = '\u001B(0Hello';
		expect(truncateLine(line, 5)).toBe(line);
		// Truncate to 3 should give ESC(0 + "Hel"
		expect(truncateLine(line, 3)).toBe('\u001B(0Hel');
	});

	test('preserves DCS sequences (ESC P ... ST)', () => {
		// ESC P payload ESC \ — zero visible width
		const dcs = '\u001BP1;1|00/00\u001B\\Hello';
		expect(truncateLine(dcs, 5)).toBe(dcs);
	});

	test('preserves APC sequences (ESC _ ... ST)', () => {
		// ESC _ payload ESC \ — zero visible width
		const apc = '\u001B_payload\u001B\\Hello';
		expect(truncateLine(apc, 5)).toBe(apc);
	});
});
