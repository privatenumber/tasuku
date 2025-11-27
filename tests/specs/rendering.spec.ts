import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
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

		test('spinner stops when task completes', async () => {
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

			// After task completes, final output should show checkmark not spinner
			expect(result.stdout).toContain('✔');

			// Green checkmark in final output
			expect(result.stdout).toContain(yoctocolors.green('✔'));
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
				`${yoctocolors.yellow('⠋')} Parent\n`
				+ `${ansiEscapes.eraseLine}${ansiEscapes.cursorUp()}${ansiEscapes.eraseLine}${ansiEscapes.cursorLeft}${yoctocolors.yellow('❯')} Parent\n`
				+ `  ${yoctocolors.yellow('⠋')} Child\n`
				+ `${ansiEscapes.eraseLine}${ansiEscapes.cursorUp()}${ansiEscapes.eraseLine}${ansiEscapes.cursorUp()}${ansiEscapes.eraseLine}${ansiEscapes.cursorLeft}${yoctocolors.yellow('❯')} Parent\n`
				+ `  ${yoctocolors.green('✔')} Child`,
			);
		});
	});
});
