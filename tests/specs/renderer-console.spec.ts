import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.js';

// Needs to be in project directory to resolve #tasuku via import maps
const tempDir = new URL('../..', import.meta.url);

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
			const textOutput = stripAnsi(result.output);

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

			expect(stripAnsi(result.output).includes('error message')).toBe(true);
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

			expect(stripAnsi(result.output).includes('warning message')).toBe(true);
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
			const textOutput = stripAnsi(result.output);

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

			expect(stripAnsi(result.output).includes('during task')).toBe(true);
		});
	});
});
