import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

const dot = process.platform === 'darwin' ? '⏺' : '●';

describe('blink theme', () => {
	test('uses dot spinner instead of braille', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { pinned } from '#tasuku';
			import { createTasuku, theme } from '#tasuku/blink';
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
		expect(plain).toMatch(new RegExp(`[${dot}] Spinner test`));
		expect(plain).not.toMatch(/[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏] Spinner test/);
	});

	test('success icon uses dot character', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku/blink';

			await task('Done', async () => {});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		const plain = stripAnsi(result.stderr);
		expect(plain).toContain(`${dot} Done`);

		// Success dot should use truecolor green: rgb(78,186,101)
		expect(result.stderr).toContain('\u001B[38;2;78;186;101m');
	});

	test('spinner uses terracotta color', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { pinned } from '#tasuku';
			import { createTasuku, theme } from '#tasuku/blink';
			import { setTimeout } from 'node:timers/promises';

			const task = createTasuku({ renderer: pinned, theme });

			await task('Loading test', async () => {
				await setTimeout(500);
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		// Spinner should use terracotta: rgb(215,119,87)
		expect(result.stderr).toContain('\u001B[38;2;215;119;87m');
	});
});
