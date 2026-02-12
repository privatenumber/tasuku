import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { nodePty } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';
import { hasSpinner } from '../utils/spinner-frames.ts';

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
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain('Error task');

			// Red error icon (31m = red)
			expect(result.stderr).toContain(ansis.red('✖'));

			// Gray arrow and message (90m = gray/bright black)
			expect(result.stderr).toContain(ansis.gray('→ Something went wrong'));
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
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain('Warning task');

			// Yellow warning icon (33m = yellow)
			expect(result.stderr).toContain(ansis.yellow('⚠'));

			// Gray arrow and message
			expect(result.stderr).toContain(ansis.gray('→ Warning message'));
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
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain('one');
			expect(result.stderr).toContain('two');
			expect(result.stderr).toContain(ansis.green('✔'));

			// Gray square for pending state (90m = gray/bright black)
			expect(result.stderr).toContain(ansis.gray('◼'));
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
			expect(result.stdout).toBe('');

			// Status appears in brackets after title
			expect(result.stderr).toContain('My task');

			// Status has dim styling (2m = dim, 22m = reset dim)
			expect(result.stderr).toContain(ansis.dim('[loading]'));
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
			expect(result.stdout).toBe('');

			// Both status updates appear in output

			// Dim styling for status
			expect(result.stderr).toContain(ansis.dim('[step 1]'));
			expect(result.stderr).toContain(ansis.dim('[step 2]'));

			// Final output has no status brackets after clearing
			const lines = result.stderr.split('\n');
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
			expect(result.stdout).toBe('');

			// All output lines should be indented at the same level (2 spaces)
			expect(result.stderr).toContain(`\n  ${ansis.gray('→ line 1')}`);
			expect(result.stderr).toContain(`\n  ${ansis.gray('line 2')}`);
			expect(result.stderr).toContain(`\n  ${ansis.gray('line 3')}`);
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
			expect(result.stdout).toBe('');

			// Both titles should appear in output
			expect(result.stderr).toContain('Initial title');
			expect(result.stderr).toContain('Updated title');

			// Verify title update order: initial appears before updated
			const initialIndex = result.stderr.indexOf('Initial title');
			const updatedIndex = result.stderr.indexOf('Updated title');
			expect(initialIndex).toBeLessThan(updatedIndex);

			// Check for spinner
			expect(result.stderr).toContain(ansis.yellow('⠋'));

			// Check that the *final* line is the updated title
			const finalSuccessLine = `${ansis.green('✔')} Updated title`;
			expect(result.stderr).toContain(finalSuccessLine);

			// Initial title should not appear in final success line
			const initialSuccessLine = `${ansis.green('✔')} Initial title`;
			expect(result.stderr).not.toContain(initialSuccessLine);
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
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain('Error object message');

			// Check for red X and gray arrow
			expect(result.stderr).toContain(ansis.red('✖'));
			expect(result.stderr).toContain(ansis.gray('→ Error object message'));
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

			// console.log output stays on stdout
			expect(result.stdout).toContain('Caught: Task failed');

			// Task UI renders to stderr
			expect(result.stderr).toContain(ansis.red('✖'));
			expect(result.stderr).toContain(ansis.gray('→ Task failed'));
		});

		test('clear method removes single task', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task to clear', async () => {
						await setTimeout(50);
					}).clear();

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// console.log output stays on stdout
			expect(result.stdout).toContain('AFTER_CLEAR');

			// Check for ANSI clear codes in task UI output (stderr)
			expect(result.stderr).toContain(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
		});

		test('setError() with no arg reverts to loading state', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Retry task', async ({ setError }) => {
						setError('temporary failure');
						await setTimeout(100);
						setError();
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const pty = nodePty(fixture.getPath('test.mjs'));
			for await (const _chunk of pty) {
				if (pty.output.includes(ansis.red('✖'))) {
					break;
				}
			}

			// Error state was shown
			expect(pty.output).toContain(ansis.red('✖'));
			expect(pty.output).toContain('Retry task');

			// Wait for recovery to loading state
			for await (const _chunk of pty) {
				if (hasSpinner(pty.output)) {
					break;
				}
			}

			// Spinner returned after clearing error
			expect(hasSpinner(pty.output)).toBe(true);

			const result = await pty;
			expect(result.exitCode).toBe(0);
		});

		test('setError(false) reverts to loading state', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Retry task', async ({ setError }) => {
						setError('temporary failure');
						await setTimeout(100);
						setError(false);
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const pty = nodePty(fixture.getPath('test.mjs'));
			for await (const _chunk of pty) {
				if (pty.output.includes(ansis.red('✖'))) {
					break;
				}
			}

			expect(pty.output).toContain(ansis.red('✖'));

			for await (const _chunk of pty) {
				if (hasSpinner(pty.output)) {
					break;
				}
			}

			expect(hasSpinner(pty.output)).toBe(true);

			const result = await pty;
			expect(result.exitCode).toBe(0);
		});

		test('setError(null) reverts to loading state', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Retry task', async ({ setError }) => {
						setError('temporary failure');
						await setTimeout(100);
						setError(null);
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const pty = nodePty(fixture.getPath('test.mjs'));
			for await (const _chunk of pty) {
				if (pty.output.includes(ansis.red('✖'))) {
					break;
				}
			}

			expect(pty.output).toContain(ansis.red('✖'));

			for await (const _chunk of pty) {
				if (hasSpinner(pty.output)) {
					break;
				}
			}

			expect(hasSpinner(pty.output)).toBe(true);

			const result = await pty;
			expect(result.exitCode).toBe(0);
		});

		test('setWarning() with no arg reverts to loading state', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Warn task', async ({ setWarning }) => {
						setWarning('temporary warning');
						await setTimeout(100);
						setWarning();
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const pty = nodePty(fixture.getPath('test.mjs'));
			for await (const _chunk of pty) {
				if (pty.output.includes(ansis.yellow('⚠'))) {
					break;
				}
			}

			// Warning state was shown
			expect(pty.output).toContain(ansis.yellow('⚠'));
			expect(pty.output).toContain('Warn task');

			// Wait for recovery to loading state
			for await (const _chunk of pty) {
				if (hasSpinner(pty.output)) {
					break;
				}
			}

			// Spinner returned after clearing warning
			expect(hasSpinner(pty.output)).toBe(true);

			const result = await pty;
			expect(result.exitCode).toBe(0);
		});

		test('group.clear method removes all tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task.group(task => [
						task('Task 1', async () => {
							await setTimeout(50);
							return 1;
						}),
						task('Task 2', async () => {
							await setTimeout(50);
							return 2;
						}),
					]).clear();

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// console.log output stays on stdout
			expect(result.stdout).toContain('AFTER_CLEAR');

			// Check for green checkmarks before clearing (task UI on stderr)
			expect(result.stderr).toContain(ansis.green('✔'));

			// Check for ANSI clear codes (clear line and move up)
			expect(result.stderr).toContain(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
		});
	});
});
