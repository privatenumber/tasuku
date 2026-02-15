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
});
