import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('console interleaving', ({ test }) => {
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
			console.log({ stdout: result.stdout });
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'Before any tasks\n'
				+ 'Inside first task\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GBetween tasks\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GInside second task\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GAfter all tasks\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G\u001B[32m✔\u001B[39m First task\n'
				+ '\u001B[32m✔\u001B[39m Second task',
			);
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
			console.log({ stdout: result.stdout });
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'1: Start\n'
				+ '2: Inside parent\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G3: Inside child 1\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G4: Between children\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G5: Inside child 2\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G6: After children\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G7: End\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G\u001B[33m❯\u001B[39m Parent task\n'
				+ '  \u001B[32m✔\u001B[39m Child task 1\n'
				+ '  \u001B[32m✔\u001B[39m Child task 2',
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
			console.log({ stdout: result.stdout });
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'Before group\n'
				+ 'A: Start\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GA: End\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GB: Start\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GB: End\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GC: Start\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GC: End\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GAfter group\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G\u001B[32m✔\u001B[39m Task A\n'
				+ '\u001B[32m✔\u001B[39m Task B\n'
				+ '\u001B[32m✔\u001B[39m Task C',
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
			console.log({ stdout: result.stdout });
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'1: Starting tests\n'
				+ '2: Will succeed\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G3: First task done\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G4: Will warn\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G5: Warning task done\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G6: Will error\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G7: Error caught\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G8: All done\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G\u001B[32m✔\u001B[39m Success task\n'
				+ '\u001B[33m⚠\u001B[39m Warning task\n'
				+ '  \u001B[90m→ This is a warning\u001B[39m\n'
				+ '\u001B[31m✖\u001B[39m Error task\n'
				+ '  \u001B[90m→ Task failed\u001B[39m',
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
			console.log({ stdout: result.stdout });
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				'Log 1\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GLog 2\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GLog 3\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GLog 4\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[GLog 5\n'
				+ '\n'
				+ '\u001B[2K\u001B[1A\u001B[2K\u001B[G\u001B[32m✔\u001B[39m Task with many logs \u001B[2m[Step 5/5]\u001B[22m',
			);
		});
	});
});
