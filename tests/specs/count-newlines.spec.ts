import { describe, test, expect } from 'manten';
import { countNewlines } from '../../src/utils/count-newlines.ts';

describe('countNewlines', () => {
	test('matches split-based newline count', () => {
		const inputs = [
			'',
			'no newline',
			'a\nb',
			'a\nb\n',
			'\n\n\n',
			'line 1\nline 2\nline 3',
		];

		for (const input of inputs) {
			expect(countNewlines(input)).toBe(input.split('\n').length - 1);
		}
	});
});
