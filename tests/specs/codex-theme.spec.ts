import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

export default testSuite(({ describe }) => {
	describe('codex theme', ({ test }) => {
		test('uses bullet dot spinner instead of braille', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku/codex';
				import { setTimeout } from 'node:timers/promises';

				const task = createTasuku(theme);

				await task('Spinner test', async () => {
					await setTimeout(500);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
			expect(result.stderr).toBe('');

			const plain = stripAnsi(result.stdout);
			// Should use bullet dot, not braille
			expect(plain).toMatch(/• Spinner test/);
			expect(plain).not.toMatch(/[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏] Spinner test/);
		});

		test('success icon uses green bold checkmark', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku/codex';

				await task('Done', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
			expect(result.stderr).toBe('');

			const plain = stripAnsi(result.stdout);
			expect(plain).toContain('✓ Done');

			// Success icon should be green bold
			expect(result.stdout).toContain('\u001B[32m\u001B[1m✓\u001B[22m\u001B[39m');
		});

		test('error icon uses red bold cross', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku/codex';

				await task('Error test', async ({ setError }) => {
					setError('something broke');
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
			expect(result.stderr).toBe('');

			const plain = stripAnsi(result.stdout);
			expect(plain).toContain('✗ Error test');
		});

		test('spinner uses monochrome gray palette', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku/codex';
				import { setTimeout } from 'node:timers/promises';

				const task = createTasuku(theme);

				await task('Loading test', async () => {
					await setTimeout(500);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
			expect(result.stderr).toBe('');

			// Spinner should use gray base color: rgb(128,128,128)
			expect(result.stdout).toContain('\u001B[38;2;128;128;128m');
		});
	});
});
