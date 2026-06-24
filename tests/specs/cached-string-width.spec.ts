import { describe, test, expect } from 'manten';
import stringWidth from 'string-width';
import { cachedStringWidth } from '../../src/utils/cached-string-width.ts';

// The cache is a pure memo: it must always return exactly what string-width
// returns, since the re-anchor's wrap math depends on the precise width.
describe('cachedStringWidth', () => {
	test('matches string-width across input kinds', () => {
		const inputs = [
			'',
			'plain ascii text',
			'⠋ task 1 [working]', // spinner icon + ascii
			'✔ task done',
			'\u001B[32m✔\u001B[39m colored line', // ANSI escapes
			'你好世界', // CJK (wide)
			'résumé café', // Latin-1
			'👍 thumbs', // emoji
		];

		for (const input of inputs) {
			expect(cachedStringWidth(input)).toBe(stringWidth(input));
		}
	});

	test('repeat calls return the same width (cache hit)', () => {
		const line = '\u001B[33m⠋\u001B[39m building [step 2]';
		const first = cachedStringWidth(line);
		expect(cachedStringWidth(line)).toBe(first);
		expect(first).toBe(stringWidth(line));
	});
});
