import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

describe('claude theme', () => {
	test('uses Claude spinner frames', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { pinned } from '#tasuku';
			import { createTasuku, theme } from '#tasuku/claude';
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
		// Should contain one of the spinner frames (middle dot or dingbat stars)
		expect(plain).toMatch(/[·✢✳✶✻✽] Spinner test/);
		// Default braille spinner frames should NOT appear
		expect(plain).not.toMatch(/[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏] Spinner test/);
	});

	test('uses truecolor Claude palette', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku/claude';

			await task('Color test', async () => {});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		// Success icon should use truecolor green: rgb(78,186,101)
		expect(result.stderr).toContain('\u001B[38;2;78;186;101m✔\u001B[39m');
		expect(result.stderr).toContain('Color test');
	});

	test('error state uses Claude pink-red', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku/claude';

			await task('Error test', async ({ setError }) => {
				setError('something broke');
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), { FORCE_COLOR: '3' });
		expect(result.stdout).toBe('');

		// Error icon should use truecolor pink-red: rgb(255,107,128)
		expect(result.stderr).toContain('\u001B[38;2;255;107;128m✖\u001B[39m');
	});

	test('loading spinner uses Claude terracotta', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { pinned } from '#tasuku';
			import { createTasuku, theme } from '#tasuku/claude';
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
