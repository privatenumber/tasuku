import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

describe('codex theme', () => {
	test('uses bullet dot spinner instead of braille', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { createTasuku, pinned } from '#tasuku/create';
			import { theme } from '#tasuku/theme/codex';
			import { setTimeout } from 'node:timers/promises';

			const task = createTasuku({ renderer: pinned, theme });

			await task('Spinner test', async () => {
				await setTimeout(500);
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		const plain = stripAnsi(result.stderr);
		expect(plain).toMatch(/• Spinner test/);
		expect(plain).not.toMatch(/[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏] Spinner test/);
	});

	test('success icon uses green bold checkmark', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku/theme/codex';

			await task('Done', async () => {});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		const plain = stripAnsi(result.stderr);
		expect(plain).toContain('✓ Done');

		// Success icon should be green bold
		expect(result.stderr).toContain('\u001B[32m\u001B[1m✓\u001B[22m\u001B[39m');
	});

	test('error icon uses red bold cross', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku/theme/codex';

			await task('Error test', async ({ setError }) => {
				setError('something broke');
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		const plain = stripAnsi(result.stderr);
		expect(plain).toContain('✗ Error test');
	});

	test('spinner uses monochrome gray palette', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { createTasuku, pinned } from '#tasuku/create';
			import { theme } from '#tasuku/theme/codex';
			import { setTimeout } from 'node:timers/promises';

			const task = createTasuku({ renderer: pinned, theme });

			await task('Loading test', async () => {
				await setTimeout(500);
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		// Spinner should use gray base color: rgb(128,128,128)
		expect(result.stderr).toContain('\u001B[38;2;128;128;128m');
	});
});
