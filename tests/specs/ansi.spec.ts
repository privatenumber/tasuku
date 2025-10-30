import { stripVTControlCharacters } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('ANSI control codes', ({ test }) => {
		test('uses ANSI clear and cursor movement codes', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(200);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// Task completes successfully
			expect(stripVTControlCharacters(result.output).includes('Task')).toBe(true);

			// ANSI codes for line clearing and cursor movement
			// \x1B[2K = clear line
			// \x1B[1A = move cursor up one line
			expect(result.output).toContain('\u001B[2K');
			expect(result.output).toContain('\u001B[1A');
		});

		test('ANSI clear codes present during spinner animation', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(200);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// Verify task completed
			expect(stripVTControlCharacters(result.output).includes('Task')).toBe(true);

			// ANSI codes for cursor movement and line clearing during spinner updates
			expect(result.output).toContain('\u001B[2K'); // clear line
			expect(result.output).toContain('\u001B[1A'); // move up
		});

		test('multiple line clears for multiple tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task.group(task => [
						task('one', async () => { await setTimeout(100); }),
						task('two', async () => { await setTimeout(100); }),
						task('three', async () => { await setTimeout(100); }),
					], { concurrency: 3 });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			// All task names appear
			expect(textOutput.includes('one')).toBe(true);
			expect(textOutput.includes('two')).toBe(true);
			expect(textOutput.includes('three')).toBe(true);

			// Multiple ANSI clear codes for updating multiple tasks
			expect(result.output).toContain('\u001B[2K');
			expect(result.output).toContain('\u001B[1A');
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

			// Should contain ANSI clear codes (line clear and cursor up)
			// These codes are used to clear Task 1 from the screen
			expect(result.output).toContain('\u001B[2K'); // clear line
			expect(result.output).toContain('\u001B[1A'); // move cursor up
		});
	});
});
