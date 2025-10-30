import { stripVTControlCharacters, styleText } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('task states', ({ test }) => {
		test('success state shows checkmark', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Success task', async () => {
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput.includes('✔')).toBe(true);
			expect(textOutput.includes('Success task')).toBe(true);
		});

		test('error state shows error icon', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Error task', async ({ setError }) => {
						setError('Something went wrong');
					});
				`,
			}, { tempDir });

			try {
				const result = await node(fixture.getPath('test.mjs'), {
					FORCE_COLOR: '1',
				});
				const textOutput = stripVTControlCharacters(result.output);
				expect(textOutput.includes('Error task')).toBe(true);

				// Red error icon with foreground-only reset
				expect(result.output).toContain(styleText('red', '✖'));
			} catch (error: unknown) {
				// setError causes task to throw, check error output
				// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Error type from nano-spawn
				const output = (error as any).output || (error as any).stdout || '';
				const textOutput = stripVTControlCharacters(output);
				expect(textOutput.includes('Error task')).toBe(true);

				// Red error icon with foreground-only reset
				expect(output).toContain(styleText('red', '✖'));
			}
		});

		test('warning state shows warning icon', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Warning task', async ({ setWarning }) => {
						setWarning('Warning message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);
			expect(textOutput.includes('Warning task')).toBe(true);

			// Yellow warning icon with foreground-only reset
			expect(result.output).toContain(styleText('yellow', '⚠'));
		});

		test('task with status shows status text', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with status', async ({ setStatus }) => {
						setStatus('processing...');
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(stripVTControlCharacters(result.output).includes('processing...')).toBe(true);
		});

		test('task with output shows output text', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with output', async ({ setOutput }) => {
						setOutput('some output text');
						await setTimeout(100);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(stripVTControlCharacters(result.output).includes('some output text')).toBe(true);
		});

		test('nested tasks are indented', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent', async ({ task }) => {
						await task('Child', async () => {
							await setTimeout(50);
						});
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput.includes('Parent')).toBe(true);
			expect(textOutput.includes('Child')).toBe(true);
			expect(textOutput.includes('  ')).toBe(true);
		});

		test('warning message shows with arrow format', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Warning task', async ({ setWarning }) => {
						setWarning('This is a warning message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);
			expect(textOutput.includes('→ This is a warning message')).toBe(true);

			// Gray arrow and message with foreground-only reset
			expect(result.output).toContain(styleText('gray', '→ This is a warning message'));
		});

		test('error message shows with arrow format', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Error task', async ({ setError }) => {
						setError('This is an error message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);
			expect(textOutput.includes('→ This is an error message')).toBe(true);

			// Gray arrow and message with foreground-only reset
			expect(result.output).toContain(styleText('gray', '→ This is an error message'));
		});
	});
});
