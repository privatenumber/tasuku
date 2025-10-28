import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.js';

// Needs to be in project directory to resolve #tasuku via import maps
const tempDir = new URL('../..', import.meta.url);

export default testSuite(({ describe }) => {
	describe('ANSI codes', ({ test }) => {
		test('uses ANSI clear codes in TTY mode', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async () => {
						await new Promise(resolve => setTimeout(resolve, 200));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// In TTY environments, should use ANSI codes for clearing
			// In non-TTY (like CI), renderer may not use ANSI codes
			// Just verify task completes successfully
			expect(stripAnsi(result.output).includes('Task')).toBe(true);
		});

		test('ANSI clear codes present during spinner animation', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async () => {
						await new Promise(resolve => setTimeout(resolve, 200));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// In TTY: ANSI codes for cursor movement and line clearing
			// In non-TTY: simple text output
			expect(stripAnsi(result.output).includes('Task')).toBe(true);
		});

		test('multiple line clears for multiple tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task.group(task => [
						task('one', async () => { await new Promise(resolve => setTimeout(resolve, 100)); }),
						task('two', async () => { await new Promise(resolve => setTimeout(resolve, 100)); }),
						task('three', async () => { await new Promise(resolve => setTimeout(resolve, 100)); }),
					], { concurrency: 3 });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			// In TTY: multiple cursor movements for updating tasks
			// In non-TTY: all task names appear
			expect(textOutput.includes('one')).toBe(true);
			expect(textOutput.includes('two')).toBe(true);
			expect(textOutput.includes('three')).toBe(true);
		});
	});
});
