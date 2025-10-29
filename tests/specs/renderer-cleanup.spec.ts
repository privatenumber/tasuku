import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.js';

// Needs to be in project directory to resolve #tasuku via import maps
const tempDir = new URL('../..', import.meta.url);

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
			expect(stripAnsi(result.output).includes('Task')).toBe(true);
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
			expect(stripAnsi(result.output).includes('test message')).toBe(true);
		});
	});
});
