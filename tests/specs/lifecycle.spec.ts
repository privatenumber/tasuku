import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';
import { nodePty } from '../utils/pty.js';

export default testSuite(({ describe }) => {
	describe('lifecycle', ({ describe }) => {
		describe('cleanup', ({ test }) => {
			const clearOneTaskScript = `
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
			`;
			const clearAllTasksScript = `
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
			`;

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
				expect(result.stdout).toContain(ansis.green('✔'));
				expect(result.stdout).toContain('Task');
			});

			test('cleared task is removed from the terminal', async ({ onTestFail }) => {
				await using fixture = await createFixture({ 'test.mjs': clearOneTaskScript }, { tempDir });
				const result = await nodePty(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });
				expect(result.exitCode).toBe(0);
				expect(result.screen).toBe('FINAL_OUTPUT\n✔ Task 2');
			});

			test('cleared task is excluded from subsequent piped output', async () => {
				await using fixture = await createFixture({ 'test.mjs': clearOneTaskScript }, { tempDir });
				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');
				const finalOutput = result.stdout.split('FINAL_OUTPUT').at(-1) || '';
				expect(finalOutput).not.toContain('Task 1');
				expect(finalOutput).toContain('Task 2');
			});

			test('clearing all tasks removes the terminal output', async () => {
				await using fixture = await createFixture({ 'test.mjs': clearAllTasksScript }, { tempDir });
				const result = await nodePty(fixture.getPath('test.mjs'));
				expect(result.exitCode).toBe(0);
				expect(result.screen).toBe('After all cleared');
			});

			test('clearing all tasks restores piped console output', async () => {
				await using fixture = await createFixture({ 'test.mjs': clearAllTasksScript }, { tempDir });
				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');
				expect(result.stdout).toContain('After all cleared');
				const finalOutput = result.stdout.split('After all cleared').at(-1) || '';
				expect(finalOutput).not.toContain('Task 1');
				expect(finalOutput).not.toContain('Task 2');
			});
		});

		describe('cursor visibility', ({ test }) => {
			test('cursor is not hidden during task execution', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					// Force TTY mode before importing tasuku
					process.stdout.isTTY = true;

					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(100);
					});
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

				expect(result.output).not.toContain(ansiEscapes.cursorHide);
			});

			test('cursor is not hidden on exit even without clear()', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					// Force TTY mode before importing tasuku (works for both Ink and custom renderer)
					process.stdout.isTTY = true;

					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task without clear', async () => {
						await setTimeout(50);
					});

					// No .clear() called - cursor should remain visible
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

				// Cursor should never be hidden
				expect(result.output).not.toContain(ansiEscapes.cursorHide);
				expect(result.output).not.toContain(ansiEscapes.cursorShow);
			});

			test('cursor is not hidden on exit after error without clear()', async ({ onTestFail }) => {
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

					// No .clear() called - cursor should remain visible
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

				expect(result.output).not.toContain(ansiEscapes.cursorHide);
				expect(result.output).not.toContain(ansiEscapes.cursorShow);
			});

			test('cursor is not hidden via clear()', async ({ onTestFail }) => {
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

					// .clear() was called - cursor should remain visible
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

				expect(result.output).not.toContain(ansiEscapes.cursorHide);
				expect(result.output).not.toContain(ansiEscapes.cursorShow);
			});
		});
	});
});
