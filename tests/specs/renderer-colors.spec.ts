import { stripVTControlCharacters } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('color environment variables', ({ test }) => {
		test('NO_COLOR disables colors', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Success task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				NO_COLOR: '1',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain the checkmark but without color codes
			expect(textOutput.includes('✔')).toBe(true);

			// Should NOT contain color codes (green for checkmark)
			expect(result.output.includes('\u001B[32m')).toBe(false);
		});

		test('NODE_DISABLE_COLORS disables colors', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Success task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				NODE_DISABLE_COLORS: '1',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain the checkmark but without color codes
			expect(textOutput.includes('✔')).toBe(true);

			// Should NOT contain color codes (green for checkmark)
			expect(result.output.includes('\u001B[32m')).toBe(false);
		});

		test('FORCE_COLOR=0 disables colors', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Success task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '0',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain the checkmark but without color codes
			expect(textOutput.includes('✔')).toBe(true);

			// Should NOT contain color codes (green for checkmark)
			expect(result.output.includes('\u001B[32m')).toBe(false);
		});

		test('FORCE_COLOR=1 enables colors', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Success task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain the checkmark
			expect(textOutput.includes('✔')).toBe(true);

			// Should contain color codes (green for checkmark: \u001B[32m)
			expect(result.output.includes('\u001B[32m')).toBe(true);
		});

		test('colors work with error state', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Error task', async ({ setError }) => {
						await setTimeout(50);
						setError('Something failed');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain the error icon
			expect(textOutput.includes('✖')).toBe(true);
		});

		test('NO_COLOR removes all colors including warning', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Warning task', async ({ setWarning }) => {
						await setTimeout(50);
						setWarning('A warning');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				NO_COLOR: '1',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain the warning icon
			expect(textOutput.includes('⚠')).toBe(true);

			// Should NOT contain yellow color code (\u001B[33m)
			expect(result.output.includes('\u001B[33m')).toBe(false);
		});

		test('colors work with nested tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent task', async ({ task }) => {
						await setTimeout(50);
						await task('Child task', async () => {
							await setTimeout(50);
						});
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain both pointer and checkmark
			expect(textOutput.includes('❯')).toBe(true);
			expect(textOutput.includes('✔')).toBe(true);

			// Should contain yellow color for pointer (\u001B[33m)
			expect(result.output.includes('\u001B[33m')).toBe(true);

			// Should contain green color for checkmark (\u001B[32m)
			expect(result.output.includes('\u001B[32m')).toBe(true);
		});

		test('NO_COLOR with nested tasks removes all colors', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent task', async ({ task }) => {
						await setTimeout(50);
						await task('Child task', async () => {
							await setTimeout(50);
						});
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				NO_COLOR: '1',
			});

			const textOutput = stripVTControlCharacters(result.output);

			// Should contain both pointer and checkmark (text only)
			expect(textOutput.includes('❯')).toBe(true);
			expect(textOutput.includes('✔')).toBe(true);

			// Should NOT contain any color codes
			expect(result.output.includes('\u001B[32m')).toBe(false); // green
			expect(result.output.includes('\u001B[33m')).toBe(false); // yellow
			expect(result.output.includes('\u001B[31m')).toBe(false); // red
			expect(result.output.includes('\u001B[36m')).toBe(false); // cyan
		});
	});
});
