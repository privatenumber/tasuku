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

			const [result, pipedResult] = await Promise.all([
				nodePty(fixture.getPath('test.mjs')),
				node(fixture.getPath('test.mjs')),
			]);
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe('After task\n✔ Test task');
			expect(pipedResult.stderr).toBe('');
			expect(pipedResult.stdout).toContain(`${ansis.green('✔')} Test task`);
			expect(pipedResult.stdout).toContain('After task');
			expect(pipedResult.stdout.lastIndexOf('Test task')).toBeGreaterThan(
				pipedResult.stdout.indexOf('After task'),
			);
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

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe(
				'Before any tasks\n'
				+ 'Inside first task\n'
				+ 'Between tasks\n'
				+ 'Inside second task\n'
				+ 'After all tasks\n'
				+ '✔ First task\n'
				+ '✔ Second task',
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

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe(
				'1: Start\n'
				+ '2: Inside parent\n'
				+ '3: Inside child 1\n'
				+ '4: Between children\n'
				+ '5: Inside child 2\n'
				+ '6: After children\n'
				+ '7: End\n'
				+ '❯ Parent task\n'
				+ '  ✔ Child task 1\n'
				+ '  ✔ Child task 2',
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

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe(
				'Before group\n'
				+ 'A: Start\n'
				+ 'A: End\n'
				+ 'B: Start\n'
				+ 'B: End\n'
				+ 'C: Start\n'
				+ 'C: End\n'
				+ 'After group\n'
				+ '✔ Task A\n'
				+ '✔ Task B\n'
				+ '✔ Task C',
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

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe([
				'1: Starting tests',
				'2: Will succeed',
				'3: First task done',
				'4: Will warn',
				'5: Warning task done',
				'6: Will error',
				'7: Error caught',
				'8: All done',
				'✔ Success task',
				'⚠ Warning task',
				'  → This is a warning',
				'✖ Error task',
				'  → Task failed',
			].join('\n'));
			const finalRender = result.rawOutput.slice(result.rawOutput.lastIndexOf('8: All done'));
			expect(finalRender).toContain(`${ansis.green('✔')} Success task`);
			expect(finalRender).toContain(`${ansis.yellow('⚠')} Warning task`);
			expect(finalRender).toContain(`  ${ansis.gray('→ This is a warning')}`);
			expect(finalRender).toContain(`${ansis.red('✖')} Error task`);
			expect(finalRender).toContain(`  ${ansis.gray('→ Task failed')}`);
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

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe(
				'Log 1\nLog 2\nLog 3\nLog 4\nLog 5\n✔ Task with many logs [Step 5/5]',
			);
			const finalRender = result.rawOutput.slice(result.rawOutput.lastIndexOf('Log 5'));
			expect(finalRender).toContain(`${ansis.green('✔')} Task with many logs ${ansis.dim('[Step 5/5]')}`);
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

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 8,
			});
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe([
				...Array.from({ length: 20 }, (_, index) => `log-${String(index).padStart(2, '0')}`),
				'✔ Scroll test task',
			].join('\n'));
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
