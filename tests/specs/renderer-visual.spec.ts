import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.js';

// Needs to be in project directory to resolve #tasuku via import maps
const tempDir = new URL('../..', import.meta.url);

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

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			expect(textOutput.includes('✔')).toBe(true);

			// Checkmark (✔) should be green (\u001B[32m is green ANSI code)
			expect(result.output).toMatch(/\u001B\[32m✔/);
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
			const textOutput = stripAnsi(result.output);

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
			const textOutput = stripAnsi(result.output);

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
			const textOutput = stripAnsi(result.output);

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

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			// Split into lines and find the final output structure
			const lines = textOutput.split('\n').filter(line => line.trim());

			// Verify both tasks are present
			expect(lines.some(line => line.includes('Parent'))).toBe(true);
			expect(lines.some(line => line.includes('Child'))).toBe(true);

			// Child task must have checkmark (✔)
			expect(textOutput.includes('✔')).toBe(true);

			// Verify child line has checkmark and is indented
			const childLine = lines.find(line => line.includes('Child') && line.includes('✔'));
			expect(childLine).toBeTruthy();
			if (childLine) {
				expect(childLine.match(/^\s{2,}/)).toBeTruthy();
			}

			// Parent task (with children) should have pointer (❯)
			// This is the key visual distinction for parent tasks
			expect(textOutput.includes('❯')).toBe(true);

			// Verify parent line has pointer and is not indented
			const parentLine = lines.find(line => line.includes('Parent') && line.includes('❯'));
			expect(parentLine).toBeTruthy();
			if (parentLine) {
				expect(parentLine.match(/^❯/)).toBeTruthy();
			}

		// Checkmark (✔) should be green (\u001B[32m is green ANSI code)
		expect(result.output).toMatch(/\u001B\[32m✔/);

		// Pointer (❯) should be yellow (\u001B[33m is yellow ANSI code)
		expect(result.output).toMatch(/\u001B\[33m❯/);
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

			const result = await node(fixture.getPath('test.mjs'));
			const textOutput = stripAnsi(result.output);

			// Split output into non-empty lines
			const lines = textOutput.split('\n').filter(line => line.trim());

			// Find lines with "Task completed"
			const taskLines = lines.filter(line => line.includes('Task completed'));

			// Should have at least 2 occurrences (parent and child)
			expect(taskLines.length).toBeGreaterThanOrEqual(2);

			// Check for required symbols
			expect(textOutput.includes('✔')).toBe(true);

			// Check indentation pattern exists
			const hasIndentedLine = lines.some(line =>
				line.match(/^\s{2,}/) && line.includes('Task completed')
			);
			expect(hasIndentedLine).toBe(true);

			// Parent task (with children) must have pointer (❯)
			expect(textOutput.includes('❯')).toBe(true);

			// Verify parent line has pointer and is not indented
			const parentLine = taskLines.find(line => !line.match(/^\s{2,}/) && line.includes('❯'));
			expect(parentLine).toBeTruthy();

			// Checkmark (✔) should be green (\u001B[32m is green ANSI code)
			expect(result.output).toMatch(/\u001B\[32m✔/);

			// Pointer (❯) should be yellow (\u001B[33m is yellow ANSI code)
			expect(result.output).toMatch(/\u001B\[33m❯/);
		});
	});
});
