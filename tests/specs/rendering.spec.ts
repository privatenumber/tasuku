import { stripVTControlCharacters, styleText } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('visual rendering', ({ test }) => {
		test('spinner animates through multiple frames with yellow color', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(200);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			// Spinner characters: ⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏
			const spinnerChars = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
			const hasSpinner = spinnerChars.split('').some(char => result.output.includes(char));
			expect(hasSpinner).toBe(true);

			// Yellow color for spinner (33m = yellow)
			expect(result.output).toContain('\u001B[33m');

			// Task completes successfully
			expect(stripVTControlCharacters(result.output).includes('Task')).toBe(true);
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

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			// After task completes, final output should show checkmark not spinner
			expect(stripVTControlCharacters(result.output).includes('✔')).toBe(true);

			// Green checkmark in final output
			expect(result.output).toContain(styleText('green', '✔'));
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

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Both task names appear
			expect(textOutput.includes('one') && textOutput.includes('two')).toBe(true);

			// Spinner characters present
			const spinnerChars = '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏';
			const hasSpinner = spinnerChars.split('').some(char => result.output.includes(char));
			expect(hasSpinner).toBe(true);

			// Yellow spinners
			expect(result.output).toContain('\u001B[33m');
		});

		test('nested tasks show proper indentation and symbols', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent task', async ({ task }) => {
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

			// Check both tasks are present
			expect(textOutput.includes('Parent task')).toBe(true);
			expect(textOutput.includes('Child task')).toBe(true);

			// Check for indentation (child should have leading spaces)
			const lines = textOutput.split('\n');
			const childLine = lines.find(line => line.includes('Child task'));
			if (childLine) {
				expect(childLine.startsWith(' ')).toBe(true);
			}

			// Check final output contains completed symbols
			expect(textOutput.includes('✔')).toBe(true);

			// Green checkmark
			expect(result.output).toContain(styleText('green', '✔'));
		});

		test('nested tasks final format shows parent with yellow pointer and child with green checkmark', async () => {
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

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Split into lines and find the final output structure
			const lines = textOutput.split('\n').filter(line => line.trim());

			// Verify both tasks are present
			expect(lines.some(line => line.includes('Parent'))).toBe(true);
			expect(lines.some(line => line.includes('Child'))).toBe(true);

			// Verify child line has checkmark and is indented
			const childLine = lines.find(line => line.includes('Child') && line.includes('✔'));
			expect(childLine).toBeTruthy();
			if (childLine) {
				expect(childLine.match(/^\s{2,}/)).toBeTruthy();
			}

			// Verify parent line has pointer and is not indented
			const parentLine = lines.find(line => line.includes('Parent') && line.includes('❯'));
			expect(parentLine).toBeTruthy();
			if (parentLine) {
				expect(parentLine.match(/^❯/)).toBeTruthy();
			}

			// Green checkmark with foreground-only reset
			expect(result.output).toContain(styleText('green', '✔'));

			// Yellow pointer with foreground-only reset
			expect(result.output).toContain(styleText('yellow', '❯'));

			// Verify exact ANSI codes
			expect(result.output).toContain('\u001B[32m'); // green
			expect(result.output).toContain('\u001B[33m'); // yellow
		});

		test('validates exact nested format with pointer and checkmark', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task completed', async ({ task }) => {
						await task('Task completed', async () => {
							await setTimeout(50);
						});
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Split output into non-empty lines
			const lines = textOutput.split('\n').filter(line => line.trim());

			// Find lines with "Task completed"
			const taskLines = lines.filter(line => line.includes('Task completed'));

			// Should have at least 2 occurrences (parent and child)
			expect(taskLines.length).toBeGreaterThanOrEqual(2);

			// Check indentation pattern exists
			const hasIndentedLine = lines.some(line => line.match(/^\s{2,}/) && line.includes('Task completed'));
			expect(hasIndentedLine).toBe(true);

			// Verify parent line has pointer and is not indented
			const parentLine = taskLines.find(line => !/^\s{2,}/.test(line) && line.includes('❯'));
			expect(parentLine).toBeTruthy();

			// Green checkmark with foreground-only reset
			expect(result.output).toContain(styleText('green', '✔'));

			// Yellow pointer with foreground-only reset
			expect(result.output).toContain(styleText('yellow', '❯'));
		});

		test('parent task shows yellow pointer while loading child', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent', async ({ task }) => {
						await task('Child', async () => {
							await setTimeout(150);
						});
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			// Yellow pointer (not red) with foreground-only reset
			expect(result.output).toContain(styleText('yellow', '❯'));
			expect(result.output).toContain('\u001B[33m❯');
		});

		test('parent task shows red pointer on error', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					try {
						await task('Parent', async ({ task }) => {
							await task('Child', async () => {
								await setTimeout(50);
								throw new Error('Test error');
							});
						});
					} catch (error) {
						// Expected error
					}
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});

			// Red pointer when child errors with foreground-only reset
			expect(result.output).toContain(styleText('red', '❯'));
			expect(result.output).toContain('\u001B[31m❯');
		});
	});
});
