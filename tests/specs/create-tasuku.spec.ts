import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import ansis from 'ansis';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('createTasuku', ({ test }) => {
		test('custom spinner frames appear in output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				const task = createTasuku({
					...theme,
					spinner: ['A', 'B', 'C'],
				});

				await task('Spinner test', async () => {
					await setTimeout(200);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			const plain = stripAnsi(result.stdout);
			// Custom spinner frame should appear (one of A, B, or C)
			expect(plain).toMatch(/[ABC] Spinner test/);
			// Default spinner frames should NOT appear
			expect(plain).not.toMatch(/[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏] Spinner test/);
		});

		test('custom icons appear in output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';

				const task = createTasuku({
					...theme,
					icons: { ...theme.icons, success: '✓', pending: '○' },
				});

				await task('Icon test', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			const plain = stripAnsi(result.stdout);
			// Custom success icon
			expect(plain).toContain('✓ Icon test');
			// Default success icon should NOT appear
			expect(plain).not.toContain('✔');
		});

		test('pre-colored icons applied in output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';
				import { blue } from 'ansis';

				const task = createTasuku({
					...theme,
					icons: { ...theme.icons, success: blue('✔') },
				});

				await task('Color test', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Blue success icon instead of green
			expect(result.stdout).toContain(ansis.blue('✔'));
			expect(result.stdout).not.toContain(ansis.green('✔'));
		});

		test('custom parent icon', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';

				const task = createTasuku({
					...theme,
					icons: { ...theme.icons, parent: '▸' },
				});

				await task('Parent test', async () => {
					await task('Child', async () => {});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			const plain = stripAnsi(result.stdout);
			expect(plain).toContain('▸ Parent test');
			expect(plain).not.toContain('❯');
		});

		test('default export works unchanged', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				await task('Default export', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain(ansis.green('✔'));
			expect(result.stdout).toContain('Default export');
		});

		test('independent instances do not interfere', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';
				import { blue, magenta } from 'ansis';

				const taskA = createTasuku({
					...theme,
					icons: { ...theme.icons, success: blue('A') },
				});

				const taskB = createTasuku({
					...theme,
					icons: { ...theme.icons, success: magenta('B') },
				});

				await Promise.all([
					taskA('Instance A', async () => {}),
					taskB('Instance B', async () => {}),
				]);
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Each instance uses its own theme
			expect(result.stdout).toContain(ansis.blue('A'));
			expect(result.stdout).toContain(ansis.magenta('B'));
			expect(result.stdout).toContain('Instance A');
			expect(result.stdout).toContain('Instance B');
		});
	});
});
