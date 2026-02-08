import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('task states', ({ test }) => {
		test('error state shows red X with gray message', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Error task', async ({ setError }) => {
						setError('Something went wrong');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Error task');

			// Red error icon (31m = red)
			expect(result.stdout).toContain(yoctocolors.red('✖'));

			// Gray arrow and message (90m = gray/bright black)
			expect(result.stdout).toContain(yoctocolors.gray('→ Something went wrong'));
		});

		test('warning state shows yellow warning with gray message', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Warning task', async ({ setWarning }) => {
						setWarning('Warning message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Warning task');

			// Yellow warning icon (33m = yellow)
			expect(result.stdout).toContain(yoctocolors.yellow('⚠'));

			// Gray arrow and message
			expect(result.stdout).toContain(yoctocolors.gray('→ Warning message'));
		});

		test('pending state shows square symbol', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task.group(task => [
						task('one', async () => { await setTimeout(50); }),
						task('two', async () => { await setTimeout(50); }),
					], { concurrency: 1 });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('one');
			expect(result.stdout).toContain('two');
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Gray square for pending state (90m = gray/bright black)
			expect(result.stdout).toContain(yoctocolors.gray('◼'));
		});

		test('status displays in brackets with dim styling', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				await task('My task', async ({ setStatus }) => {
					setStatus('loading');
				});
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Status appears in brackets after title
			expect(result.stdout).toContain('My task');

			// Status has dim styling (2m = dim, 22m = reset dim)
			expect(result.stdout).toContain(yoctocolors.dim('[loading]'));
		});

		test('status can be updated and cleared', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async ({ setStatus }) => {
					setStatus('step 1');
					await setTimeout(50);
					setStatus('step 2');
					await setTimeout(50);
					setStatus(undefined);
					await setTimeout(50);
				});
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Both status updates appear in output

			// Dim styling for status
			expect(result.stdout).toContain(yoctocolors.dim('[step 1]'));
			expect(result.stdout).toContain(yoctocolors.dim('[step 2]'));

			// Final output has no status brackets after clearing
			const lines = result.stdout.split('\n');
			const finalTaskLine = lines.reverse().find(line => line.includes('✔') && line.includes('Task'));
			expect(finalTaskLine).toBeTruthy();
			expect(finalTaskLine).not.toMatch(/\[step/);
		});

		test('task with multi-line output indents each line', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import task from '#tasuku';

				await task('Task with multi-line output', async ({ setOutput }) => {
					setOutput('line 1\nline 2\nline 3');
				});
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// All output lines should be indented at the same level (2 spaces)
			expect(result.stdout).toContain(`\n  ${yoctocolors.gray('→ line 1')}`);
			expect(result.stdout).toContain(`\n  ${yoctocolors.gray('line 2')}`);
			expect(result.stdout).toContain(`\n  ${yoctocolors.gray('line 3')}`);
		});

		test('setTitle updates task title dynamically', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Initial title', async ({ setTitle }) => {
						await setTimeout(50);
						setTitle('Updated title');
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Both titles should appear in output
			expect(result.stdout).toContain('Initial title');
			expect(result.stdout).toContain('Updated title');

			// Verify title update order: initial appears before updated
			const initialIndex = result.stdout.indexOf('Initial title');
			const updatedIndex = result.stdout.indexOf('Updated title');
			expect(initialIndex).toBeLessThan(updatedIndex);

			// Check for spinner
			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));

			// Check that the *final* line is the updated title
			const finalSuccessLine = `${yoctocolors.green('✔')} Updated title`;
			expect(result.stdout).toContain(finalSuccessLine);

			// Initial title should not appear in final success line
			const initialSuccessLine = `${yoctocolors.green('✔')} Initial title`;
			expect(result.stdout).not.toContain(initialSuccessLine);
		});

		test('setError with Error object', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setError }) => {
						setError(new Error('Error object message'));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Error object message');

			// Check for red X and gray arrow
			expect(result.stdout).toContain(yoctocolors.red('✖'));
			expect(result.stdout).toContain(yoctocolors.gray('→ Error object message'));
		});

		test('task function throws error', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					try {
						await task('Task', async () => {
							throw new Error('Task failed');
						});
					} catch (error) {
						console.log('Caught:', error.message);
					}
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Caught: Task failed');

			// Check for red X and gray arrow in error output
			expect(result.stdout).toContain(yoctocolors.red('✖'));
			expect(result.stdout).toContain(yoctocolors.gray('→ Task failed'));
		});

		test('clear method removes single task', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const taskApi = await task('Task to clear', async () => {
						await setTimeout(50);
					});

					taskApi.clear();

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Task should be cleared after marker
			const parts = result.stdout.split('AFTER_CLEAR');
			const afterClear = parts[1] || '';
			expect(afterClear).not.toContain('Task to clear');

			// Check for ANSI clear codes
			expect(result.stdout).toContain(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
		});

		test('group.clear method removes all tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const group = await task.group(task => [
						task('Task 1', async () => {
							await setTimeout(50);
							return 1;
						}),
						task('Task 2', async () => {
							await setTimeout(50);
							return 2;
						}),
					]);

					group.clear();

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Tasks should be cleared after marker
			const parts = result.stdout.split('AFTER_CLEAR');
			const afterClear = parts[1] || '';
			expect(afterClear).not.toContain('Task 1');
			expect(afterClear).not.toContain('Task 2');

			// Check for green checkmarks before clearing
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Check for ANSI clear codes (clear line and move up)
			expect(result.stdout).toContain(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
		});
	});
});
