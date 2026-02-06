import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';
import { assertInOrder } from '../utils/assert-order.js';

export default testSuite(({ describe }) => {
	describe('console interleaving', ({ test, describe }) => {
		const clearLine = `${ansiEscapes.eraseLine}${ansiEscapes.cursorUp()}${ansiEscapes.eraseLine}${ansiEscapes.cursorLeft}`;

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
			expect(result.stdout).toContain(`${yoctocolors.green('✔')} Test task`);
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
				+ '\n'
				+ `${clearLine}Between tasks\n`
				+ '\n'
				+ `${clearLine}Inside second task\n`
				+ '\n'
				+ `${clearLine}After all tasks\n`
				+ '\n'
				+ `${clearLine}${yoctocolors.green('✔')} First task\n`
				+ `${yoctocolors.green('✔')} Second task`,
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
				+ '\n'
				+ `${clearLine}3: Inside child 1\n`
				+ '\n'
				+ `${clearLine}4: Between children\n`
				+ '\n'
				+ `${clearLine}5: Inside child 2\n`
				+ '\n'
				+ `${clearLine}6: After children\n`
				+ '\n'
				+ `${clearLine}7: End\n`
				+ '\n'
				+ `${clearLine}${yoctocolors.yellow('❯')} Parent task\n`
				+ `  ${yoctocolors.green('✔')} Child task 1\n`
				+ `  ${yoctocolors.green('✔')} Child task 2`,
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
				+ '\n'
				+ `${clearLine}A: End\n`
				+ '\n'
				+ `${clearLine}B: Start\n`
				+ '\n'
				+ `${clearLine}B: End\n`
				+ '\n'
				+ `${clearLine}C: Start\n`
				+ '\n'
				+ `${clearLine}C: End\n`
				+ '\n'
				+ `${clearLine}After group\n`
				+ '\n'
				+ `${clearLine}${yoctocolors.green('✔')} Task A\n`
				+ `${yoctocolors.green('✔')} Task B\n`
				+ `${yoctocolors.green('✔')} Task C`,
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
				+ '\n'
				+ `${clearLine}3: First task done\n`
				+ '\n'
				+ `${clearLine}4: Will warn\n`
				+ '\n'
				+ `${clearLine}5: Warning task done\n`
				+ '\n'
				+ `${clearLine}6: Will error\n`
				+ '\n'
				+ `${clearLine}7: Error caught\n`
				+ '\n'
				+ `${clearLine}8: All done\n`
				+ '\n'
				+ `${clearLine}${yoctocolors.green('✔')} Success task\n`
				+ `${yoctocolors.yellow('⚠')} Warning task\n`
				+ `  ${yoctocolors.gray('→ This is a warning')}\n`
				+ `${yoctocolors.red('✖')} Error task\n`
				+ `  ${yoctocolors.gray('→ Task failed')}`,
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
				+ '\n'
				+ `${clearLine}Log 2\n`
				+ '\n'
				+ `${clearLine}Log 3\n`
				+ '\n'
				+ `${clearLine}Log 4\n`
				+ '\n'
				+ `${clearLine}Log 5\n`
				+ '\n'
				+ `${clearLine}${yoctocolors.green('✔')} Task with many logs ${yoctocolors.dim('[Step 5/5]')}`,
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

			// Check that ANSI clear codes are present
			expect(result.stdout).toContain(ansiEscapes.cursorUp());
			expect(result.stdout).toContain(ansiEscapes.eraseLine);

			// Console output should have happened during execution
			expect(result.stdout).toContain('0');
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
				const successString = `${yoctocolors.green('✔')} Task`;
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
				expect(afterUserOutput).not.toContain(ansiEscapes.eraseLine);
			});
		});
	});
});
