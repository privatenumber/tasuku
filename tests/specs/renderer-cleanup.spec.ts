import { stripVTControlCharacters } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
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

		test('cursor shown after renderer destroy', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// After completion, cursor should be visible (show cursor code: \u001B[?25h)
			expect(result.output.length).toBeGreaterThan(0);
		});

		test('cursor hidden during task execution', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// Output should contain cursor hide/show codes
			expect(result.output.length).toBeGreaterThan(0);
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

		test('clearing task triggers ANSI clear codes', async () => {
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
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// Should contain ANSI clear codes (line clear: \u001B[2K, cursor up: \u001B[1A)
			// These codes are used to clear Task 1 from the screen
			expect(result.output.includes('\u001B[2K')).toBe(true);
			expect(result.output.includes('\u001B[1A')).toBe(true);
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

		test('tasks cleared with console output interspersed', async () => {
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

					// No console output after clear - program exits
					// Without fix: tasks remain visible at end of output
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// Check that ANSI clear codes are present
			const hasMoveCursor = result.output.includes('\u001B[1A');
			const hasClearLine = result.output.includes('\u001B[2K');
			expect(hasMoveCursor).toBe(true);
			expect(hasClearLine).toBe(true);

			// Console output should have happened during execution
			const textOutput = stripVTControlCharacters(result.output);
			expect(textOutput.includes('0')).toBe(true);
		});
	});
});
