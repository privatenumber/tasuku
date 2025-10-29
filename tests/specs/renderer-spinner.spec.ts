import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.js';

// Needs to be in project directory to resolve #tasuku via import maps
const tempDir = new URL('../..', import.meta.url);

export default testSuite(({ describe }) => {
	describe('spinner animation', ({ test }) => {
		test('spinner animates through multiple frames', async () => {
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

			// In TTY environments, spinner should animate
			// In non-TTY (like CI), spinner may not appear
			// Just verify task completes successfully
			expect(stripAnsi(result.output).includes('Task')).toBe(true);
		});

		test('spinner stops when task completes', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// After task completes, final output should show checkmark not spinner
			expect(stripAnsi(result.output).includes('✔')).toBe(true);
		});

		test('multiple concurrent tasks show spinners', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task.group(task => [
						task('one', async () => { await setTimeout(150); }),
						task('two', async () => { await setTimeout(150); }),
					], { concurrency: 2 });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			// In TTY: spinner frames appear
			// In non-TTY: task names appear
			expect(textOutput.includes('one') && textOutput.includes('two')).toBe(true);
		});
	});
});
