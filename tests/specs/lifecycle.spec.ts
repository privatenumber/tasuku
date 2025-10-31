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

			test('console.error during task execution', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';

					await task('Task with error', async () => {
						console.error('error message');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain('error message');
			});

			test('console.warn during task execution', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';

					await task('Task with warning', async () => {
						console.warn('warning message');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain('warning message');
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

			test('console restored after cleanup', async () => {
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
				expect(result.stderr).toBe('');

				// Verify console.log still works after cleanup
				const successString = `${yoctocolors.green('✔')} Task`;
				expect(result.stdout).toContain('test message');
				expect(result.stdout).toContain(successString);
				expect(result.stdout.indexOf('test message')).toBeLessThan(result.stdout.indexOf(successString));
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

			test('console.log during failing task', async () => {
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
				expect(result.stdout.indexOf('after task')).toBeLessThan(result.stdout.indexOf(failString));
			});
		});

		describe('cleanup', ({ test }) => {
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

			test('cleared task removed but other tasks remain', async () => {
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
				expect(result.stderr).toBe('');

				// Check output after marker
				const parts = result.stdout.split('FINAL_OUTPUT');
				const afterMarker = parts[1] || '';

				// Task 1 should be cleared
				expect(afterMarker).not.toContain('Task 1');

				// Task 2 should still be present
				expect(afterMarker).toContain('Task 2');
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
	});
});
