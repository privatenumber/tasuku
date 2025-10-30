import { stripVTControlCharacters } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
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
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput.includes('message 1')).toBe(true);
			expect(textOutput.includes('message 2')).toBe(true);
		});

		test('console.error during task execution', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with error', async () => {
						console.error('error message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(stripVTControlCharacters(result.output).includes('error message')).toBe(true);
		});

		test('console.warn during task execution', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with warning', async () => {
						console.warn('warning message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(stripVTControlCharacters(result.output).includes('warning message')).toBe(true);
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
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput.includes('first')).toBe(true);
			expect(textOutput.includes('second')).toBe(true);
			expect(textOutput.includes('third')).toBe(true);
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

			expect(stripVTControlCharacters(result.output).includes('during task')).toBe(true);
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

			// Verify console.log still works after cleanup
			expect(stripVTControlCharacters(result.output).includes('test message')).toBe(true);
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

			// Check that ANSI clear codes are present
			const hasMoveCursor = result.output.includes('\x1B[1A');
			const hasClearLine = result.output.includes('\x1B[2K');
			expect(hasMoveCursor).toBe(true);
			expect(hasClearLine).toBe(true);

			// Console output should have happened during execution
			const textOutput = stripVTControlCharacters(result.output);
			expect(textOutput.includes('0')).toBe(true);
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

			// Verify task completed successfully
			expect(stripVTControlCharacters(result.output).includes('Task')).toBe(true);
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

					// Give renderer time to update
					await setTimeout(50);

					console.log('FINAL_OUTPUT');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			// Task should be cleared - check output after marker
			const parts = textOutput.split('FINAL_OUTPUT');
			const afterMarker = parts[1] || '';
			expect(afterMarker.includes('Task to clear')).toBe(false);

			// Should contain ANSI clear codes
			expect(result.output).toContain('\x1B[2K');
			expect(result.output).toContain('\x1B[1A');
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

					// Give renderer time to update
					await setTimeout(50);

					console.log('FINAL_OUTPUT');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			// Check output after marker
			const parts = textOutput.split('FINAL_OUTPUT');
			const afterMarker = parts[1] || '';

			// Task 1 should be cleared
			expect(afterMarker.includes('Task 1')).toBe(false);

			// Task 2 should still be present
			expect(afterMarker.includes('Task 2')).toBe(true);
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

					// Give renderer time to update
					await setTimeout(50);

					console.log('After all cleared');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			// Check output after marker
			const parts = textOutput.split('After all cleared');
			const afterMarker = parts[1] || '';

			// Both tasks should be cleared from final output
			expect(afterMarker.includes('Task 1')).toBe(false);
			expect(afterMarker.includes('Task 2')).toBe(false);

			// Console should work normally after renderer destroyed
			expect(textOutput.includes('After all cleared')).toBe(true);
		});
	});
});
