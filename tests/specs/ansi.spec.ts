import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('ANSI control codes', ({ test }) => {
		test('uses ANSI clear and cursor movement codes during spinner animation', async () => {
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
			expect(result.stderr).toBe('');

			// Hide cursor at start
			expect(result.stdout).toContain(ansiEscapes.cursorHide);

			// Multiple spinner frames showing animation
			const spinnerChars = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'.split('');
			const foundSpinners = spinnerChars.filter(
				char => result.stdout.includes(yoctocolors.yellow(char)),
			);
			expect(foundSpinners.length).toBeGreaterThan(1); // Multiple frames

			// ANSI codes appear multiple times (once per frame update)
			const eraseLineCount = result.stdout.split(ansiEscapes.eraseLine).length - 1;
			const cursorUpCount = result.stdout.split(ansiEscapes.cursorUp()).length - 1;
			expect(eraseLineCount).toBeGreaterThan(1); // Multiple clears during animation
			expect(cursorUpCount).toBeGreaterThan(1); // Multiple cursor moves

			// Final state: green checkmark
			expect(result.stdout).toContain(yoctocolors.green('✔'));
			expect(result.stdout).toContain('Task');
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
			expect(result.stderr).toBe('');

			// All task names appear with checkmarks
			expect(result.stdout).toContain('one');
			expect(result.stdout).toContain('two');
			expect(result.stdout).toContain('three');
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Count ANSI codes - should appear multiple times for multiple task updates
			const eraseLineCount = result.stdout.split(ansiEscapes.eraseLine).length - 1;
			const cursorUpCount = result.stdout.split(ansiEscapes.cursorUp()).length - 1;
			expect(eraseLineCount).toBeGreaterThan(1); // Multiple line clears
			expect(cursorUpCount).toBeGreaterThan(1); // Multiple cursor moves
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
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Both tasks appear with checkmarks initially
			expect(result.stdout).toContain('Task 1');
			expect(result.stdout).toContain('Task 2');
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Clearing triggers additional ANSI codes for re-rendering
			const eraseLineCount = result.stdout.split(ansiEscapes.eraseLine).length - 1;
			const cursorUpCount = result.stdout.split(ansiEscapes.cursorUp()).length - 1;
			// Multiple clears for task updates + clear operation
			expect(eraseLineCount).toBeGreaterThan(1);
			// Multiple cursor moves
			expect(cursorUpCount).toBeGreaterThan(1);
		});
	});
});
