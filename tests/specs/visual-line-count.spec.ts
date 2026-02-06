import { testSuite, expect } from 'manten';
import { getVisualLineCount } from '../../src/utils/visual-line-count.js';

export default testSuite(({ describe }) => {
	describe('getVisualLineCount', ({ test }) => {
		test('empty string returns 0', () => {
			expect(getVisualLineCount('', 80)).toBe(0);
		});

		test('single line', () => {
			expect(getVisualLineCount('hello\n', 80)).toBe(1);
		});

		test('multiple lines', () => {
			expect(getVisualLineCount('line1\nline2\nline3\n', 80)).toBe(3);
		});

		test('no columns (undefined) counts newlines only', () => {
			expect(getVisualLineCount('a very long line\n', undefined)).toBe(1);
		});

		test('line exactly at column width takes 1 row', () => {
			// 10 chars in 10 columns = exactly 1 row
			expect(getVisualLineCount('1234567890\n', 10)).toBe(1);
		});

		test('line wrapping at narrow width', () => {
			// 20 chars in 10 columns = 2 rows
			expect(getVisualLineCount('12345678901234567890\n', 10)).toBe(2);
		});

		test('multiple wrapping lines', () => {
			// Line 1: 15 chars / 10 cols = 2 rows
			// Line 2: 5 chars / 10 cols = 1 row
			expect(getVisualLineCount('123456789012345\n12345\n', 10)).toBe(3);
		});

		test('empty lines count as 1 row each', () => {
			expect(getVisualLineCount('\n\n\n', 80)).toBe(3);
		});
	});
});
