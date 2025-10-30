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

			// Status has dim/gray styling
			expect(result.output).toContain(styleText('gray', '[loading]'));
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

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			// Both status updates appear in output
			expect(textOutput).toContain('Task [step 1]');
			expect(textOutput).toContain('Task [step 2]');

			// Final output has no status brackets after clearing
			const lines = textOutput.split('\n');
			const finalTaskLine = lines.reverse().find(line => line.includes('✔') && line.includes('Task'));
			expect(finalTaskLine).toBeTruthy();
			expect(finalTaskLine).not.toContain('[');
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
