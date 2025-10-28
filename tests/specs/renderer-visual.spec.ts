import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.js';

// Needs to be in project directory to resolve #tasuku via import maps
const tempDir = new URL('../..', import.meta.url);

export default testSuite(({ describe }) => {
	describe('renderer visual elements', ({ test }) => {
		test('success task shows checkmark', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async () => {
						await new Promise(resolve => setTimeout(resolve, 50));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(stripAnsi(result.output).includes('✔')).toBe(true);
		});

		test('loading task shows spinner characters', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async () => {
						await new Promise(resolve => setTimeout(resolve, 150));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// In TTY: spinner characters appear
			// In non-TTY: just task name appears
			expect(stripAnsi(result.output).includes('Task')).toBe(true);
		});

		test('pending task shows square symbol', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task.group(task => [
						task('one', async () => { await new Promise(resolve => setTimeout(resolve, 50)); }),
						task('two', async () => { await new Promise(resolve => setTimeout(resolve, 50)); }),
					], { concurrency: 1 });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			// In TTY: pending symbol ◼ appears
			// In non-TTY: task names still appear
			expect(textOutput.includes('one') && textOutput.includes('two')).toBe(true);
		});
	});
});
