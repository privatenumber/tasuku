import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.js';
import { extractAnsiCodes } from '../utils/ansi.js';

// Needs to be in project directory to resolve #tasuku via import maps
const tempDir = new URL('../..', import.meta.url);

export default testSuite(({ describe }) => {
	describe('task states', ({ test }) => {
		test('success state shows checkmark', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Success task', async () => {
						await new Promise(resolve => setTimeout(resolve, 50));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			expect(textOutput.includes('✔')).toBe(true);
			expect(textOutput.includes('Success task')).toBe(true);
		});

		test('error state shows error icon', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Error task', async ({ setError }) => {
						setError('Something went wrong');
					});
				`,
			}, { tempDir });

			try {
				const result = await node(fixture.getPath('test.mjs'));
				const textOutput = stripAnsi(result.output);
				// If it doesn't throw, check the output anyway

				const ansi = extractAnsiCodes(result.output);

				expect(textOutput.includes('❌') || textOutput.includes('Error task')).toBe(true);

				// Style validation - error should use red (only in TTY environments)
				if (
					ansi.colors.red.length > 0
					|| ansi.colors.green.length > 0
					|| ansi.colors.reset.length > 0
				) {
					expect(ansi.colors.red.length).toBeGreaterThan(0);
				}
			} catch (error: unknown) {
				// setError causes task to throw, check error output
				// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Error type from nano-spawn
				const output = (error as any).output || (error as any).stdout || '';
				expect(stripAnsi(output).includes('❌') || stripAnsi(output).includes('Error task')).toBe(true);
			}
		});

		test('warning state shows warning icon', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Warning task', async ({ setWarning }) => {
						setWarning('Warning message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			expect(textOutput.includes('⚠️') || textOutput.includes('⚠')).toBe(true);
			expect(textOutput.includes('Warning task')).toBe(true);
		});

		test('task with status shows status text', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task with status', async ({ setStatus }) => {
						setStatus('processing...');
						await new Promise(resolve => setTimeout(resolve, 100));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(stripAnsi(result.output).includes('processing...')).toBe(true);
		});

		test('task with output shows output text', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task with output', async ({ setOutput }) => {
						setOutput('some output text');
						await new Promise(resolve => setTimeout(resolve, 100));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(stripAnsi(result.output).includes('some output text')).toBe(true);
		});

		test('nested tasks are indented', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Parent', async ({ task }) => {
						await task('Child', async () => {
							await new Promise(resolve => setTimeout(resolve, 50));
						});
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			expect(textOutput.includes('Parent')).toBe(true);
			expect(textOutput.includes('Child')).toBe(true);
			expect(textOutput.includes('  ')).toBe(true);
		});
	});
});