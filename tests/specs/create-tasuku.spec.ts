import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

export default testSuite(({ describe }) => {
	describe('createTasuku', ({ test }) => {
		test('custom spinner frames appear in output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				const task = createTasuku({
					theme: {
						...theme,
						spinner: ['A', 'B', 'C'],
					},
				});

				await task('Spinner test', async () => {
					await setTimeout(200);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
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
					theme: {
						...theme,
						icons: { ...theme.icons, success: '✓', pending: '○' },
					},
				});

				await task('Icon test', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
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
					theme: {
						...theme,
						icons: { ...theme.icons, success: blue('✔') },
					},
				});

				await task('Color test', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Blue success icon instead of green
			expect(result.stderr).toContain(ansis.blue('✔'));
			expect(result.stderr).not.toContain(ansis.green('✔'));
		});

		test('custom parent icon', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';

				const task = createTasuku({
					theme: {
						...theme,
						icons: { ...theme.icons, parent: '▸' },
					},
				});

				await task('Parent test', async () => {
					await task('Child', async () => {});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
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
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.green('✔'));
			expect(result.stderr).toContain('Default export');
		});

		test('independent instances do not interfere', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, theme } from '#tasuku';
				import { blue, magenta } from 'ansis';

				const taskA = createTasuku({
					theme: {
						...theme,
						icons: { ...theme.icons, success: blue('A') },
					},
				});

				const taskB = createTasuku({
					theme: {
						...theme,
						icons: { ...theme.icons, success: magenta('B') },
					},
				});

				await Promise.all([
					taskA('Instance A', async () => {}),
					taskB('Instance B', async () => {}),
				]);
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Each instance uses its own theme
			expect(result.stderr).toContain(ansis.blue('A'));
			expect(result.stderr).toContain(ansis.magenta('B'));
			expect(result.stderr).toContain('Instance A');
			expect(result.stderr).toContain('Instance B');
		});
	});
});
