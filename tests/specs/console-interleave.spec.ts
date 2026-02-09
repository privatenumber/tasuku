import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.js';
import { nodePty } from '../utils/pty.js';
import { tempDir } from '../utils/temp-dir.js';
import { assertInOrder } from '../utils/assert-order.js';

export default testSuite(({ describe }) => {
	describe('console interleaving', ({ test, describe }) => {
		const clearRender = `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}`;
		const saveCursor = ansiEscapes.cursorSavePosition;

		test('console.log after task completion preserves all output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Test task', async () => {
					// Task completes
				});

				// Wait for render to complete, then log
				await setTimeout(50);
				console.log('After task');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Both task and console.log should be visible
			expect(result.stdout).toContain(`${ansis.green('✔')} Test task`);
			expect(result.stdout).toContain('After task');

			// Critical: task must be RE-RENDERED after console.log (not overwritten)
			// The output should end with the task, proving it was restored after console.log
			const afterTaskIndex = result.stdout.indexOf('After task');
			const lastTaskIndex = result.stdout.lastIndexOf('Test task');
			expect(lastTaskIndex).toBeGreaterThan(afterTaskIndex);
		});

		test('console.logs between tasks appear in order', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				console.log('Before any tasks');

				await task('First task', async () => {
					console.log('Inside first task');
				});

				console.log('Between tasks');

				await task('Second task', async () => {
					console.log('Inside second task');
				});

				console.log('After all tasks');
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'Before any tasks\n'
				+ 'Inside first task\n'
				+ `${saveCursor}`
				+ `${clearRender}Between tasks\n`
				+ `${saveCursor}`
				+ `${clearRender}Inside second task\n`
				+ `${saveCursor}`
				+ `${clearRender}After all tasks\n`
				+ `${saveCursor}`
				+ `${clearRender}${ansis.green('✔')} First task\n`
				+ `${ansis.green('✔')} Second task`,
			);
		});

		test('console.logs between tasks persist', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import tasuku from '#tasuku';

				console.log(1111);

				await tasuku('A', ({ setStatus }) => {
					setStatus('Status A');
				});

				console.log(2222);

				await tasuku('B', ({ setStatus }) => {
					setStatus('Status B');
				});

				console.log(3333);
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			assertInOrder(stripAnsi(result.stdout), [
				'1111\n',
				'2222\n',
				'3333\n',
			]);
		});

		test('console.logs with nested tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				console.log('1: Start');

				await task('Parent task', async ({ task }) => {
					console.log('2: Inside parent');

					await task('Child task 1', async () => {
						console.log('3: Inside child 1');
					});

					console.log('4: Between children');

					await task('Child task 2', async () => {
						console.log('5: Inside child 2');
					});

					console.log('6: After children');
				});

				console.log('7: End');
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'1: Start\n'
				+ '2: Inside parent\n'
				+ `${saveCursor}`
				+ `${clearRender}3: Inside child 1\n`
				+ `${saveCursor}`
				+ `${clearRender}4: Between children\n`
				+ `${saveCursor}`
				+ `${clearRender}5: Inside child 2\n`
				+ `${saveCursor}`
				+ `${clearRender}6: After children\n`
				+ `${saveCursor}`
				+ `${clearRender}7: End\n`
				+ `${saveCursor}`
				+ `${clearRender}${ansis.yellow('❯')} Parent task\n`
				+ `  ${ansis.green('✔')} Child task 1\n`
				+ `  ${ansis.green('✔')} Child task 2`,
			);
		});

		test('console.logs with task.group parallel execution', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				console.log('Before group');

				await task.group(task => [
					task('Task A', async () => {
						console.log('A: Start');
						console.log('A: End');
					}),
					task('Task B', async () => {
						console.log('B: Start');
						console.log('B: End');
					}),
					task('Task C', async () => {
						console.log('C: Start');
						console.log('C: End');
					}),
				]);

				console.log('After group');
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'Before group\n'
				+ 'A: Start\n'
				+ `${saveCursor}`
				+ `${clearRender}A: End\n`
				+ `${saveCursor}`
				+ `${clearRender}B: Start\n`
				+ `${saveCursor}`
				+ `${clearRender}B: End\n`
				+ `${saveCursor}`
				+ `${clearRender}C: Start\n`
				+ `${saveCursor}`
				+ `${clearRender}C: End\n`
				+ `${saveCursor}`
				+ `${clearRender}After group\n`
				+ `${saveCursor}`
				+ `${clearRender}${ansis.green('✔')} Task A\n`
				+ `${ansis.green('✔')} Task B\n`
				+ `${ansis.green('✔')} Task C`,
			);
		});

		test('console.logs with mixed states', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				console.log('1: Starting tests');

				await task('Success task', async () => {
					console.log('2: Will succeed');
				});

				console.log('3: First task done');

				await task('Warning task', async ({ setWarning }) => {
					console.log('4: Will warn');
					setWarning('This is a warning');
				});

				console.log('5: Warning task done');

				try {
					await task('Error task', async ({ setError }) => {
						console.log('6: Will error');
						setError('This is an error');
						throw new Error('Task failed');
					});
				} catch (error) {
					console.log('7: Error caught');
				}

				console.log('8: All done');
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'1: Starting tests\n'
				+ '2: Will succeed\n'
				+ `${saveCursor}`
				+ `${clearRender}3: First task done\n`
				+ `${saveCursor}`
				+ `${clearRender}4: Will warn\n`
				+ `${saveCursor}`
				+ `${clearRender}5: Warning task done\n`
				+ `${saveCursor}`
				+ `${clearRender}6: Will error\n`
				+ `${saveCursor}`
				+ `${clearRender}7: Error caught\n`
				+ `${saveCursor}`
				+ `${clearRender}8: All done\n`
				+ `${saveCursor}`
				+ `${clearRender}${ansis.green('✔')} Success task\n`
				+ `${ansis.yellow('⚠')} Warning task\n`
				+ `  ${ansis.gray('→ This is a warning')}\n`
				+ `${ansis.red('✖')} Error task\n`
				+ `  ${ansis.gray('→ Task failed')}`,
			);
		});

		test('rapid console.logs during task execution', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				await task('Task with many logs', async ({ setStatus }) => {
					for (let i = 1; i <= 5; i++) {
						console.log(\`Log \${i}\`);
						setStatus(\`Step \${i}/5\`);
					}
				});
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'Log 1\n'
				+ `${saveCursor}`
				+ `${clearRender}Log 2\n`
				+ `${saveCursor}`
				+ `${clearRender}Log 3\n`
				+ `${saveCursor}`
				+ `${clearRender}Log 4\n`
				+ `${saveCursor}`
				+ `${clearRender}Log 5\n`
				+ `${saveCursor}`
				+ `${clearRender}${ansis.green('✔')} Task with many logs ${ansis.dim('[Step 5/5]')}`,
			);
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

			// Check that ANSI save/restore codes are present
			expect(result.stdout).toContain(ansiEscapes.cursorRestorePosition);
			expect(result.stdout).toContain(ansiEscapes.eraseDown);

			// Console output should have happened during execution
			expect(result.stdout).toContain('0');
		});

		test('console.logs during task survive terminal scroll', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Scroll test task', async () => {
					for (let i = 0; i < 20; i++) {
						console.log('log-' + String(i).padStart(2, '0'));
						await setTimeout(30);
					}
				});
				`,
			}, { tempDir });

			// Small terminal forces scrolling — 20 log lines + task UI won't fit in 8 rows.
			// Before the scroll fix, the saved cursor position (absolute screen coordinate)
			// became stale after scroll, causing render corruption.
			const result = await nodePty(fixture.getPath('test.mjs'), { rows: 8 });
			expect(result.exitCode).toBe(0);

			// Re-anchor sequences must be present: after each render, the renderer
			// uses relative cursorUp to re-save the position. Without this,
			// scroll invalidates the absolute saved position.
			expect(result.output).toContain(ansiEscapes.cursorUp(1));

			// Task completes successfully
			expect(result.output).toContain('✔');
			expect(result.output).toContain('Scroll test task');
		});

		describe('console routing', ({ test }) => {
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

				// Bug: console.error output goes to stdout via patch-console
				expect(result.output).toContain('error message');
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

				// Bug: console.warn output goes to stdout via patch-console
				expect(result.output).toContain('warning message');
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
				const successString = `${ansis.green('✔')} Task`;
				expect(result.stdout).toContain('test message');
				expect(result.stdout).toContain(successString);
				expect(result.stdout.indexOf('test message')).toBeLessThan(result.stdout.lastIndexOf(successString));
			});

			test('stdout.write after task completion is not overwritten', async ({ onTestFail }) => {
				await using fixture = await createFixture({
					'test.mjs': `
					process.stdout.isTTY = true;

					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', () => setTimeout(100));
					process.stdout.write('Should not get overwritten');
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				onTestFail(() => { console.log(result); });
				expect(result.stderr).toBe('');

				// The stdout.write output should appear in final output
				expect(result.stdout).toContain('Should not get overwritten');

				// The stdout.write output should appear AFTER the final task render
				// (no ANSI clear codes should appear after it)
				const userOutput = 'Should not get overwritten';
				const userOutputIndex = result.stdout.lastIndexOf(userOutput);
				const afterUserOutput = result.stdout.slice(userOutputIndex + userOutput.length);

				// There should be no ANSI clear codes after the user's output
				// If there are, it means the renderer overwrote the user's output
				expect(afterUserOutput).not.toContain(ansiEscapes.eraseDown);
			});
		});
	});
});
