import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Both titles should appear in output
			expect(result.stdout).toContain('Initial title');
			expect(result.stdout).toContain('Updated title');

			// Verify title update order: initial appears before updated
			const initialIndex = result.stdout.indexOf('Initial title');
			const updatedIndex = result.stdout.indexOf('Updated title');
			expect(initialIndex).toBeLessThan(updatedIndex);

			// Check for spinner
			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));

			// Check that the *final* line is the updated title
			const finalSuccessLine = `${yoctocolors.green('✔')} Updated title`;
			expect(result.stdout).toContain(finalSuccessLine);

			// Initial title should not appear in final success line
			const initialSuccessLine = `${yoctocolors.green('✔')} Initial title`;
			expect(result.stdout).not.toContain(initialSuccessLine);
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('string output');

			// Check for green checkmark and gray arrow
			expect(result.stdout).toContain(yoctocolors.green('✔'));
			expect(result.stdout).toContain(yoctocolors.gray('→ string output'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Error object message');

			// Check for red X and gray arrow
			expect(result.stdout).toContain(yoctocolors.red('✖'));
			expect(result.stdout).toContain(yoctocolors.gray('→ Error object message'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('String warning message');

			// Check for yellow warning and gray arrow
			expect(result.stdout).toContain(yoctocolors.yellow('⚠'));
			expect(result.stdout).toContain(yoctocolors.gray('→ String warning message'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Task completes with status
			expect(result.stdout).toContain(yoctocolors.green('✔'));
			expect(result.stdout).toContain('Task');

			// Status has dim styling
			expect(result.stdout).toContain(yoctocolors.dim('[processing]'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Caught: Task failed');

			// Check for red X and gray arrow in error output
			expect(result.stdout).toContain(yoctocolors.red('✖'));
			expect(result.stdout).toContain(yoctocolors.gray('→ Task failed'));
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

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Task should be cleared after marker
			const parts = result.stdout.split('AFTER_CLEAR');
			const afterClear = parts[1] || '';
			expect(afterClear).not.toContain('Task to clear');

			// Check for ANSI clear codes
			expect(result.stdout).toContain(ansiEscapes.eraseLine + ansiEscapes.cursorUp());
		});

		test('group.clear method removes all tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					const group = await task.group(task => [
						task('Task 1', async () => {
							await setTimeout(50);
							return 1;
						}),
						task('Task 2', async () => {
							await setTimeout(50);
							return 2;
						}),
					]);

					group.clear();

					console.log('AFTER_CLEAR');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Tasks should be cleared after marker
			const parts = result.stdout.split('AFTER_CLEAR');
			const afterClear = parts[1] || '';
			expect(afterClear).not.toContain('Task 1');
			expect(afterClear).not.toContain('Task 2');

			// Check for green checkmarks before clearing
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Check for ANSI clear codes (clear line and move up)
			expect(result.stdout).toContain(ansiEscapes.eraseLine + ansiEscapes.cursorUp());
		});
	});
});
