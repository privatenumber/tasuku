import { stripVTControlCharacters } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('CI mode', ({ test }) => {
		test('CI=true disables ANSI clearing', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				CI: 'true',
			});

			const hasMoveCursor = result.output.includes('\u001B[1A');
			const hasClearLine = result.output.includes('\u001B[2K');

			expect(hasMoveCursor).toBe(false);
			expect(hasClearLine).toBe(false);
		});

		test('GITHUB_ACTIONS=true does not disable ANSI clearing', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				GITHUB_ACTIONS: 'true',
			});

			// Master only respects CI env var, not GITHUB_ACTIONS
			const hasMoveCursor = result.output.includes('\u001B[1A');
			const hasClearLine = result.output.includes('\u001B[2K');

			expect(hasMoveCursor).toBe(true);
			expect(hasClearLine).toBe(true);
		});

		test('CI mode still shows final task states', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				CI: 'true',
			});
			const textOutput = stripVTControlCharacters(result.output);

			const hasCheckmark = textOutput.includes('✔');
			const hasTaskName = textOutput.includes('Task');

			expect(hasCheckmark).toBe(true);
			expect(hasTaskName).toBe(true);
		});
	});
});
