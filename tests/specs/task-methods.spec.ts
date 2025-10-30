import { stripVTControlCharacters, styleText } from 'node:util';
import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('task methods', ({ test }) => {
		test('setTitle updates task title dynamically', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Initial title', async ({ setTitle }) => {
						await setTimeout(50);
						setTitle('Updated title');
						await setTimeout(50);
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Both titles should appear in output
			expect(textOutput).toContain('Initial title');
			expect(textOutput).toContain('Updated title');

			// Check spinner and checkmark colors
			expect(result.output).toContain(styleText('yellow', '⠋'));
			expect(result.output).toContain(styleText('green', '✔'));
		});

		test('setOutput with string', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setOutput }) => {
						setOutput('string output');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('string output');

			// Check for green checkmark and gray arrow
			expect(result.output).toContain(styleText('green', '✔'));
			expect(result.output).toContain(styleText('gray', '→ string output'));
		});

		test('setOutput with object form', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setOutput }) => {
						setOutput({ message: 'object output' });
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('object output');

			// Check for green checkmark and gray arrow
			expect(result.output).toContain(styleText('green', '✔'));
			expect(result.output).toContain(styleText('gray', '→ object output'));
		});

		test('setError with string', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setError }) => {
						setError('String error message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('String error message');

			// Check for red X and gray arrow
			expect(result.output).toContain(styleText('red', '✖'));
			expect(result.output).toContain(styleText('gray', '→ String error message'));
		});

		test('setError with Error object', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setError }) => {
						setError(new Error('Error object message'));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('Error object message');

			// Check for red X and gray arrow
			expect(result.output).toContain(styleText('red', '✖'));
			expect(result.output).toContain(styleText('gray', '→ Error object message'));
		});

		test('setWarning with string', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setWarning }) => {
						setWarning('String warning message');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('String warning message');

			// Check for yellow warning and gray arrow
			expect(result.output).toContain(styleText('yellow', '⚠'));
			expect(result.output).toContain(styleText('gray', '→ String warning message'));
		});

		test('setWarning with Error object', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setWarning }) => {
						setWarning(new Error('Warning object message'));
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('Warning object message');

			// Check for yellow warning and gray arrow
			expect(result.output).toContain(styleText('yellow', '⚠'));
			expect(result.output).toContain(styleText('gray', '→ Warning object message'));
		});

		test('setStatus with string', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					await task('Task', async ({ setStatus }) => {
						setStatus('processing');
					});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('Task [processing]');

			// Status has dim styling
			expect(result.output).toContain(styleText('dim', '[processing]'));
		});

		test('task function throws error', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';

					try {
						await task('Task', async () => {
							throw new Error('Task failed');
						});
					} catch (error) {
						console.log('Caught:', error.message);
					}
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			expect(textOutput).toContain('Caught: Task failed');

			// Check for red X and gray arrow in error output
			expect(result.output).toContain(styleText('red', '✖'));
			expect(result.output).toContain(styleText('gray', '→ Task failed'));
		});

		test('clear method removes single task', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const taskApi = await task('Task to clear', async () => {
						await setTimeout(50);
					});

					taskApi.clear();
					await setTimeout(50);

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Task should be cleared after marker
			const parts = textOutput.split('AFTER_CLEAR');
			const afterClear = parts[1] || '';
			expect(afterClear.includes('Task to clear')).toBe(false);

			// Check for ANSI clear codes
			expect(result.output).toContain('\x1B[2K\x1B[1A');
		});

		test('group.clear method removes all tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const group = await task.group(task => [
						task('Task 1', async () => 1),
						task('Task 2', async () => 2),
					]);

					await setTimeout(50);
					group.clear();
					await setTimeout(50);

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				FORCE_COLOR: '1',
			});
			const textOutput = stripVTControlCharacters(result.output);

			// Tasks should be cleared after marker
			const parts = textOutput.split('AFTER_CLEAR');
			const afterClear = parts[1] || '';
			expect(afterClear.includes('Task 1')).toBe(false);
			expect(afterClear.includes('Task 2')).toBe(false);

			// Check for green checkmarks before clearing
			expect(result.output).toContain(styleText('green', '✔'));

			// Check for ANSI clear codes (clear line and move up)
			expect(result.output).toContain('\x1B[2K\x1B[1A');
		});
	});
});
