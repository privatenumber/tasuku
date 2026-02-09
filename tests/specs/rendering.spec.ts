import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
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

			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));

			// Task completes successfully
			expect(result.stdout).toContain(yoctocolors.green('✔'));
			expect(result.stdout).toContain('Task');

			// Verify spinner appears before completion
			const spinnerIndex = result.stdout.indexOf(yoctocolors.yellow('⠋'));
			const checkmarkIndex = result.stdout.indexOf(yoctocolors.green('✔'));
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
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Yellow spinners
			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));
		});

		test('nested tasks render correctly on success', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Parent', async ({ task }) => {
					await task('Child', async () => {
						await setTimeout(50);
					});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Define the exact final lines we expect
			const finalParentLine = `${yoctocolors.yellow('❯')} Parent`;
			const finalChildLine = `  ${yoctocolors.green('✔')} Child`;

			// Check that these lines exist in the output
			expect(result.stdout).toContain(finalParentLine);
			expect(result.stdout).toContain(finalChildLine);

			// For a more robust check, verify they are the *last* two lines
			const lines = result.stdout.split('\n').filter(line => line.trim());
			const secondToLastLine = lines.at(-2);
			const lastLine = lines.at(-1);

			// Use .includes() because the line may have other ANSI codes (like clear)
			expect(secondToLastLine).toContain(finalParentLine);
			expect(lastLine).toContain(finalChildLine);
		});

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
			expect(result.stdout).toContain(yoctocolors.yellow('❯'));

			// Verify spinner appears while child is loading
			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));
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
			expect(result.stdout).toContain(yoctocolors.red('❯'));

			// Red X for failed child task
			expect(result.stdout).toContain(yoctocolors.red('✖'));
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
				`${ansiEscapes.cursorSavePosition}${yoctocolors.yellow('⠋')} Parent\n`
				+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${yoctocolors.yellow('❯')} Parent\n`
				+ `  ${yoctocolors.yellow('⠋')} Child\n`
				+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${yoctocolors.yellow('❯')} Parent\n`
				+ `  ${yoctocolors.green('✔')} Child`,
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
					await setTimeout(200);
				});
				`,
			}, { tempDir });

			// Use interactive PTY to observe intermediate render
			const pty = nodePty(fixture.getPath('test.mjs'));
			for await (const _chunk of pty) {
				// Wait until second task is loading (spinner visible)
				if (pty.output.includes('Second task') && pty.output.includes('First task')) {
					const { output } = pty;
					// Find the LAST render frame containing both tasks
					// The completed "First task" should appear before the loading "Second task"
					const lastFirst = output.lastIndexOf('First task');
					const lastSecond = output.lastIndexOf('Second task');
					expect(lastFirst).toBeLessThan(lastSecond);
					break;
				}
			}
			const result = await pty;
			expect(result.exitCode).toBe(0);
		});

		test('line wrapping: save/restore clears correctly in narrow terminal', async () => {
			const title = 'This is a long task title for testing';
			const cols = 20;

			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('${title}', () => setTimeout(100));
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols });

			expect(result.exitCode).toBe(0);

			// Save/restore cursor handles wrapped lines without counting visual lines.
			// Verify the renderer used save/restore + erase-down to redraw.
			expect(result.output).toContain(ansiEscapes.cursorRestorePosition);
			expect(result.output).toContain(ansiEscapes.eraseDown);

			// Final output should show the completed task (checkmark)
			expect(result.output).toContain('✔');
			expect(result.output).toContain(title);
		});

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

			const result = await nodePty(fixture.getPath('test.mjs'), { cols });
			expect(result.exitCode).toBe(0);

			// Rendered format: "{icon} {title} [{statusLine1}\n{statusLine2}]\n"
			// icon is 1 visual column (spinner char or checkmark)
			const firstLineWidth = `X ${title} [${statusLine1}`.length;
			const secondLineWidth = `${statusLine2}]`.length;
			const expectedVisualLines = Math.ceil(firstLineWidth / cols)
				+ Math.ceil(secondLineWidth / cols);

			// Sanity: first line must actually wrap for this test to be meaningful
			expect(firstLineWidth).toBeGreaterThan(cols);

			// eslint-disable-next-line no-control-regex -- matching ANSI cursorUp sequences
			const cursorUpValues = [...result.output.matchAll(/\u001B\[(\d+)A/g)]
				.map(match => Number(match[1]));

			expect(cursorUpValues.length).toBeGreaterThan(0);
			for (const value of cursorUpValues) {
				expect(value).toBeGreaterThanOrEqual(expectedVisualLines);
			}
		});
	});
});
