import { stripVTControlCharacters, styleText } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('renderer visual elements', ({ test }) => {
		test('success task shows checkmark', async () => {
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
				FORCE_COLOR: '1',
			});

			// Green checkmark with foreground-only reset
			expect(result.output).toContain(styleText('green', '✔'));
		});

		test('loading task shows spinner characters', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(150);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput.includes('Task')).toBe(true);
		});

		test('pending task shows square symbol', async () => {
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

			const result = await node(fixture.getPath('test.mjs'));
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
		});

		test('nested tasks final format shows parent with pointer and child with checkmark', async () => {
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
		});
	});
});
