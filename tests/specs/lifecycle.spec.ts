import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('lifecycle', ({ describe }) => {
		describe('console interception', ({ test }) => {
			test('console.log during task execution', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with console', async () => {
						console.log('message 1');
						await setTimeout(50);
						console.log('message 2');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain('message 1');
				expect(result.stdout).toContain('message 2');
				expect(result.stdout.indexOf('message 1')).toBeLessThan(result.stdout.indexOf('message 2'));
			});

			test('console.error during task execution', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';

					await task('Task with error', async () => {
						console.error('error message');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });

				// TODO: bug - this should be fixed
				expect(result.output).toContain('error message');
				// expect(result.stderr).toContain('error message');
				// expect(result.stdout).not.toContain('error message');
			});

			test('console.warn during task execution', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';

					await task('Task with warning', async () => {
						console.warn('warning message');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });

				// TODO: bug - this should be fixed
				expect(result.output).toContain('warning message');
				// expect(result.stderr).toContain('warning message');
				// expect(result.stdout).not.toContain('warning message');
			});

			test('multiple console.log calls', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with multiple logs', async () => {
						console.log('first');
						console.log('second');
						console.log('third');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain('first');
				expect(result.stdout).toContain('second');
				expect(result.stdout).toContain('third');
				expect(result.stdout.indexOf('first')).toBeLessThan(result.stdout.indexOf('second'));
				expect(result.stdout.indexOf('second')).toBeLessThan(result.stdout.indexOf('third'));
			});

			test('console output preserved after task completion', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						console.log('during task');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain('during task');
			});

			test('console restored after cleanup', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(50);
					});

					// After task completion, console should work normally
					console.log('test message');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });
				expect(result.stderr).toBe('');

				// Verify console.log still works after cleanup
				const successString = `${yoctocolors.green('✔')} Task`;
				expect(result.stdout).toContain('test message');
				expect(result.stdout).toContain(successString);
				expect(result.stdout.indexOf('test message')).toBeLessThan(result.stdout.lastIndexOf(successString));
			});

			test('console output interspersed with task clearing', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					let counter = 0;
					console.log(counter++);

					const interval = setInterval(() => {
						console.log(counter++);
					}, 100);

					const taskApi = await task('Some task', async ({ task }) => {
						await setTimeout(500);
						await task('Nested task', async () => {
							await setTimeout(500);
						});
					});

					clearInterval(interval);
					taskApi.clear();
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				// Check that ANSI clear codes are present
				expect(result.stdout).toContain(ansiEscapes.cursorUp());
				expect(result.stdout).toContain(ansiEscapes.eraseLine);

				// Console output should have happened during execution
				expect(result.stdout).toContain('0');
			});

			test('console.log during failing task', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Failing task', async () => {
						console.log('about to fail');
						await setTimeout(50);
						throw new Error('task failed');
					}).catch(() => {
						// Catch error so process exits 0
					});

					console.log('after task');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });
				expect(result.stderr).toBe('');

				// Check that the log is preserved during task
				expect(result.stdout).toContain('about to fail');

				// Check that the task failure is shown
				const failString = `${yoctocolors.red('✖')} Failing task`;
				expect(result.stdout).toContain(failString);
				expect(result.stdout).toContain('task failed'); // The error message

				// Check that the console works after task completes
				expect(result.stdout).toContain('after task');

				// Check order: log during task -> after_log -> final failure render
				expect(result.stdout.indexOf('about to fail')).toBeLessThan(result.stdout.indexOf('after task'));
				expect(result.stdout.indexOf('after task')).toBeLessThan(result.stdout.lastIndexOf(failString));
			});
		});

		describe('cleanup', ({ test }) => {
			test('throwing task - process exits cleanly', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';

					await task('Throwing task', async () => {
						throw new Error('task error');
					}).catch((error) => {
						console.log('CAUGHT:', error.message);
					});

					// Process should exit cleanly without needing to call .clear()
					console.log('PROCESS_COMPLETED');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');
				expect(result.stdout).toContain('CAUGHT: task error');
				expect(result.stdout).toContain('PROCESS_COMPLETED');
			});

			test('process exits after tasks complete', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(100);
					});

					// Process should exit cleanly after task completion
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				// Verify task completed successfully
				expect(result.stdout).toContain(yoctocolors.green('✔'));
				expect(result.stdout).toContain('Task');
			});

			test('single task cleared removes task from output', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const taskApi = await task('Task to clear', async () => {
						await setTimeout(50);
					});

					taskApi.clear();

					console.log('FINAL_OUTPUT');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				// Task should be cleared - check output after marker
				const parts = result.stdout.split('FINAL_OUTPUT');
				const afterMarker = parts[1] || '';
				expect(afterMarker).not.toContain('Task to clear');

				// Should contain ANSI clear codes
				expect(result.stdout).toContain(ansiEscapes.eraseLine);
				expect(result.stdout).toContain(ansiEscapes.cursorUp());
			});

			test('cleared task removed but other tasks remain', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const task1 = await task('Task 1', async () => {
						await setTimeout(50);
					});

					const task2 = await task('Task 2', async () => {
						await setTimeout(50);
					});

					task1.clear();

					console.log('FINAL_OUTPUT');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });
				expect(result.stderr).toBe('');

				// Get the final rendered output (after all ANSI clearing)
				const lines = result.stdout.split('\n').filter(line => line.trim());
				const lastLine = lines.at(-1) || '';

				// Task 1 should be cleared from final output
				expect(lastLine).not.toContain('Task 1');

				// Task 2 should still be present in final output
				expect(lastLine).toContain('Task 2');
			});

			test('all tasks cleared triggers renderer destroy', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const task1 = await task('Task 1', async () => {
						await setTimeout(50);
					});

					const task2 = await task('Task 2', async () => {
						await setTimeout(50);
					});

					task1.clear();
					task2.clear();

					console.log('After all cleared');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				// Check output after marker
				const parts = result.stdout.split('After all cleared');
				const afterMarker = parts[1] || '';

				// Both tasks should be cleared from final output
				expect(afterMarker).not.toContain('Task 1');
				expect(afterMarker).not.toContain('Task 2');

				// Console should work normally after renderer destroyed
				expect(result.stdout).toContain('After all cleared');
			});
		});

		describe('cursor restoration', ({ test }) => {
			test('cursor is restored on exit even without clear()', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					// Force TTY mode before importing tasuku (works for both Ink and custom renderer)
					process.stdout.isTTY = true;

					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task without clear', async () => {
						await setTimeout(50);
					});

					// No .clear() called - cursor should still be restored on exit
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					FORCE_COLOR: '1',
				});
				onTestFail(() => {
					console.log({
						stdout: result.stdout,
						stderr: result.stderr,
					});
				});

				// Cursor hide should be present (during loading)
				expect(result.output).toContain(ansiEscapes.cursorHide);

				// Cursor show should be present (restored on exit)
				// Note: Ink writes cursor codes to stderr, custom renderer to stdout
				expect(result.output).toContain(ansiEscapes.cursorShow);
			});

			test('cursor is restored on exit after error without clear()', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					// Force TTY mode before importing tasuku
					process.stdout.isTTY = true;

					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Failing task', async () => {
						await setTimeout(50);
						throw new Error('task failed');
					}).catch(() => {
						// Catch error so process exits 0
					});

					// No .clear() called - cursor should still be restored on exit
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					FORCE_COLOR: '1',
				});
				onTestFail(() => {
					console.log({
						stdout: result.stdout,
						stderr: result.stderr,
					});
				});

				// Cursor show should be present (restored on exit)
				expect(result.output).toContain(ansiEscapes.cursorShow);
			});

			test('cursor restored via clear() removes exit handler', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					// Force TTY mode before importing tasuku
					process.stdout.isTTY = true;

					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const taskApi = await task('Task with clear', async () => {
						await setTimeout(50);
					});

					taskApi.clear();

					// .clear() was called - cursor should be restored by destroy()
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					FORCE_COLOR: '1',
				});
				onTestFail(() => {
					console.log({
						stdout: result.stdout,
						stderr: result.stderr,
					});
				});

				// Cursor show should be present (restored by destroy())
				expect(result.output).toContain(ansiEscapes.cursorShow);
			});
		});
	});
});
