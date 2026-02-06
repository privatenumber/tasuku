import { testSuite, expect } from 'manten';
import { formatElapsed } from '../../src/utils/format-elapsed.js';

export default testSuite(({ describe }) => {
	describe('formatElapsed', ({ test }) => {
		test('0ms returns (0s)', () => {
			expect(formatElapsed(0)).toBe('(0s)');
		});

		test('sub-second returns (0s)', () => {
			expect(formatElapsed(999)).toBe('(0s)');
		});

		test('exactly 1 second', () => {
			expect(formatElapsed(1000)).toBe('(1s)');
		});

		test('59 seconds', () => {
			expect(formatElapsed(59_999)).toBe('(59s)');
		});

		test('exactly 60 seconds shows minutes', () => {
			expect(formatElapsed(60_000)).toBe('(1m 0s)');
		});

		test('minutes and seconds', () => {
			expect(formatElapsed(90_000)).toBe('(1m 30s)');
		});

		test('59 minutes 59 seconds', () => {
			expect(formatElapsed(3_599_999)).toBe('(59m 59s)');
		});

		test('exactly 1 hour', () => {
			expect(formatElapsed(3_600_000)).toBe('(1h 0m)');
		});

		test('hours and minutes', () => {
			expect(formatElapsed(5_400_000)).toBe('(1h 30m)');
		});
	});
});
