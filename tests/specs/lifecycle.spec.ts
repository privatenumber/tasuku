import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

export default testSuite(({ describe }) => {
	describe('lifecycle', ({ describe }) => {
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
				expect(result.stdout).toBe('');

				// Verify task completed successfully
				expect(result.stderr).toContain(ansis.green('✔'));
				expect(result.stderr).toContain('Task');
			});

			test('cleared task removed but other tasks remain', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const p1 = task('Task 1', async () => {
						await setTimeout(50);
					});
					await p1;

					const p2 = task('Task 2', async () => {
						await setTimeout(50);
					});
					await p2;

					p1.clear();

					console.log('FINAL_OUTPUT');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });

				// Get the final rendered output (after all ANSI clearing)
				const lines = result.stderr.split('\n').filter(line => line.trim());
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

					const p1 = task('Task 1', async () => {
						await setTimeout(50);
					});
					await p1;

					const p2 = task('Task 2', async () => {
						await setTimeout(50);
					});
					await p2;

					p1.clear();
					p2.clear();

					console.log('After all cleared');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));

				// After clear(), the final erase-down leaves no task text
				const afterLastErase = result.stderr.split(ansiEscapes.eraseDown).at(-1) ?? '';
				expect(afterLastErase).not.toContain('Task 1');
				expect(afterLastErase).not.toContain('Task 2');

				// Console should work normally after renderer destroyed
				expect(result.stdout).toContain('After all cleared');
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

					await task('Task with clear', async () => {
						await setTimeout(50);
					}).clear();

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
