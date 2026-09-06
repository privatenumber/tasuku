import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.js';
import { nodePty } from '../utils/pty.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('rendering', ({ test }) => {
		test('spinner animates through multiple frames with yellow color', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async () => {
					await setTimeout(100);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain(ansis.yellow('⠋'));

			// Task completes successfully
			expect(result.stdout).toContain(ansis.green('✔'));
			expect(result.stdout).toContain('Task');

			// Verify spinner appears before completion
			const spinnerIndex = result.stdout.indexOf(ansis.yellow('⠋'));
			const checkmarkIndex = result.stdout.indexOf(ansis.green('✔'));
			expect(spinnerIndex).toBeLessThan(checkmarkIndex);
		});

		test('multiple concurrent tasks show spinners', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task => [
					task('one', async () => { await setTimeout(150); }),
					task('two', async () => { await setTimeout(150); }),
				], { concurrency: 2 });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Both task names appear
			expect(result.stdout).toContain('one');
			expect(result.stdout).toContain('two');
			expect(result.stdout).toContain(ansis.green('✔'));

			// Yellow spinners
			expect(result.stdout).toContain(ansis.yellow('⠋'));
		});

		for (const precedingLines of [0, 20]) {
			test(`nested tasks render correctly after ${precedingLines} preceding lines`, async () => {
				await using fixture = await createFixture({
					'test.mjs': String.raw`
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				process.stdout.write('history\n'.repeat(${precedingLines}));
				await task('Parent', async ({ task }) => {
					await task('Child', async () => {
						await setTimeout(50);
					});
				});
				`,
				}, { tempDir });

				const result = await nodePty(fixture.getPath('test.mjs'), {
					cols: 80,
					rows: 8,
				});
				expect(result.exitCode).toBe(0);
				expect(result.screen).toBe([
					...Array.from({ length: precedingLines }, () => 'history'),
					'❯ Parent',
					'  ✔ Child',
				].join('\n'));
			});
		}

		test('parent task shows yellow pointer while loading child', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Parent', async ({ task }) => {
					await task('Child', async () => {
						await setTimeout(150);
					});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Yellow pointer (not red) with foreground-only reset
			expect(result.stdout).toContain(ansis.yellow('❯'));

			// Verify spinner appears while child is loading
			expect(result.stdout).toContain(ansis.yellow('⠋'));
		});

		test('parent task shows red pointer on error', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				try {
					await task('Parent', async ({ task }) => {
						await task('Child', async () => {
							await setTimeout(50);
							throw new Error('Test error');
						});
					});
				} catch (error) {
					// Expected error
				}
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Red pointer when child errors with foreground-only reset
			expect(result.stdout).toContain(ansis.red('❯'));

			// Red X for failed child task
			expect(result.stdout).toContain(ansis.red('✖'));
		});

		test('child task starts with frame 0 spinner', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Parent', async ({ task }) => {
					await setTimeout(50);
					await task('Child', async () => {
						await setTimeout(50);
					});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				`${ansiEscapes.cursorSavePosition}${ansis.yellow('⠋')} Parent\n`
				+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.yellow('❯')} Parent\n`
				+ `  ${ansis.yellow('⠋')} Child\n`
				+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.yellow('❯')} Parent\n`
				+ `  ${ansis.green('✔')} Child`,
			);
		});

		test('sequential tasks preserve insertion order', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// First task completes, stays visible
				await task('First task', async () => {
					await setTimeout(50);
				});
				// Second task starts — both visible, different states
				await task('Second task', async () => {
					process.stdin.setRawMode(true);
					await new Promise(resolve => {
						process.stdin.once('data', resolve);
					});
					process.stdin.pause();
				});
				`,
			}, { tempDir });

			await using pty = nodePty(fixture.getPath('test.mjs'));
			let observedLoading = false;
			for await (const _chunk of pty) {
				const screen = await pty.getScreen();
				const lines = screen.split('\n');
				if (lines.some(line => /[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏] Second task/.test(line))) {
					expect(lines).toStrictEqual([
						'✔ First task',
						expect.stringMatching(/^[⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏] Second task$/),
					]);
					observedLoading = true;
					pty.write('continue');
					break;
				}
			}
			const result = await pty;
			expect(result.exitCode).toBe(0);
			expect(observedLoading).toBe(true);
			expect(result.screen).toBe('✔ First task\n✔ Second task');
		});

		for (const precedingLines of [0, 20]) {
			test(`line wrapping preserves output after ${precedingLines} preceding lines`, async () => {
				const title = 'This is a long task title for testing';
				const cols = 20;

				await using fixture = await createFixture({
					'test.mjs': String.raw`
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				process.stdout.write('history\n'.repeat(${precedingLines}));
				await task('${title}', () => setTimeout(100));
				`,
				}, { tempDir });

				const result = await nodePty(fixture.getPath('test.mjs'), {
					cols,
					rows: 8,
				});

				expect(result.exitCode).toBe(0);

				expect(result.screen).toBe([
					...Array.from({ length: precedingLines }, () => 'history'),
					'✔ This is a long tas',
					'k title for testing',
				].join('\n'));
			});
		}

		test('re-anchor accounts for visual line wraps from multiline status', async () => {
			const cols = 40;
			const title = 'Installing dependencies and building project';
			const statusLine1 = 'step 1';
			const statusLine2 = 'processing...';

			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('${title}', async ({ setStatus }) => {
					for (let i = 0; i < 3; i++) {
						setStatus('${statusLine1}\n${statusLine2}');
						await setTimeout(100);
					}
				});
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols,
				rows: 24,
			});
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe(
				'✔ Installing dependencies and building p\n'
				+ 'roject [step 1\n'
				+ 'processing...]',
			);
		});
	});
});
