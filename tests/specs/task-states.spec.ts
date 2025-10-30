import { stripVTControlCharacters, styleText } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('task states', ({ test }) => {
		test('success state shows green checkmark', async () => {
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

			expect(textOutput.includes('✔')).toBe(true);
			expect(textOutput.includes('Success task')).toBe(true);

			// Green checkmark (32m = green foreground, 39m = default foreground)
			expect(result.output).toContain(styleText('green', '✔'));
			expect(result.output).toContain('\x1B[32m');
		});

		test('error state shows red X with gray message', async () => {
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

				// Red error icon (31m = red)
				expect(result.output).toContain(styleText('red', '✖'));
				expect(result.output).toContain('\x1B[31m');

				// Gray arrow and message (90m = gray/bright black)
				expect(result.output).toContain(styleText('gray', '→ Something went wrong'));
				expect(result.output).toContain('\x1B[90m');
			} catch (error: unknown) {
				// setError causes task to throw, check error output
				// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Error type from nano-spawn
				const output = (error as any).output || (error as any).stdout || '';
				const textOutput = stripVTControlCharacters(output);
				expect(textOutput.includes('Error task')).toBe(true);

				expect(output).toContain(styleText('red', '✖'));
				expect(output).toContain(styleText('gray', '→ Something went wrong'));
			}
		});

		test('warning state shows yellow warning with gray message', async () => {
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

			// Yellow warning icon (33m = yellow)
			expect(result.output).toContain(styleText('yellow', '⚠'));
			expect(result.output).toContain('\x1B[33m');

			// Gray arrow and message
			expect(result.output).toContain(styleText('gray', '→ Warning message'));
			expect(result.output).toContain('\x1B[90m');
		});

		test('pending state shows square symbol', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task.group(task => [
						task('one', async () => { await setTimeout(50); }),
						task('two', async () => { await setTimeout(50); }),
					], { concurrency: 1 });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput.includes('one') && textOutput.includes('two')).toBe(true);
			expect(textOutput.includes('◼')).toBe(true);
		});

		test('loading state shows yellow spinner', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Loading task', async () => {
						await setTimeout(150);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			// Yellow spinner characters (33m = yellow)
			expect(result.output).toContain('\x1B[33m');

			// Should contain at least one spinner character
			const spinnerChars = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
			const hasSpinner = spinnerChars.split('').some(char => result.output.includes(char));
			expect(hasSpinner).toBe(true);
		});

		test('status displays in brackets with dim styling', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				await task('My task', async ({ setStatus }) => {
					setStatus('loading');
				});
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Status appears in brackets after title
			expect(textOutput).toContain('My task [loading]');

			// Status has dim styling (2m = dim, 22m = reset dim)
			expect(result.output).toContain(styleText('dim', '[loading]'));
			expect(result.output).toContain('\x1B[2m[loading]\x1B[22m');
		});

		test('status can be updated and cleared', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async ({ setStatus }) => {
					setStatus('step 1');
					await setTimeout(50);
					setStatus('step 2');
					await setTimeout(50);
					setStatus(undefined);
					await setTimeout(50);
				});
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Both status updates appear in output
			expect(textOutput).toContain('Task [step 1]');
			expect(textOutput).toContain('Task [step 2]');

			// Dim styling for status
			expect(result.output).toContain(styleText('dim', '[step 1]'));
			expect(result.output).toContain(styleText('dim', '[step 2]'));

			// Final output has no status brackets after clearing
			const lines = textOutput.split('\n');
			const finalTaskLine = lines.reverse().find(line => line.includes('✔') && line.includes('Task'));
			expect(finalTaskLine).toBeTruthy();
			expect(finalTaskLine).not.toContain('[');
		});

		test('task with output shows output text with gray arrow', async () => {
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

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput.includes('some output text')).toBe(true);

			// Gray arrow and output
			expect(result.output).toContain(styleText('gray', '→ some output text'));
		});

		test('task with multi-line output indents each line', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import task from '#tasuku';

				await task('Task with multi-line output', async ({ setOutput }) => {
					setOutput('line 1\nline 2\nline 3');
				});
			`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			// All output lines should be indented at the same level (2 spaces)
			expect(textOutput).toMatch(/^ {2}→ line 1$/m);
			expect(textOutput).toMatch(/^ {2}line 2$/m);
			expect(textOutput).toMatch(/^ {2}line 3$/m);
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
	});
});
