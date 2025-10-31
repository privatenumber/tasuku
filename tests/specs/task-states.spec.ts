import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('task states', ({ test }) => {
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Error task');

			// Red error icon (31m = red)
			expect(result.stdout).toContain(yoctocolors.red('✖'));

			// Gray arrow and message (90m = gray/bright black)
			expect(result.stdout).toContain(yoctocolors.gray('→ Something went wrong'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('Warning task');

			// Yellow warning icon (33m = yellow)
			expect(result.stdout).toContain(yoctocolors.yellow('⚠'));

			// Gray arrow and message
			expect(result.stdout).toContain(yoctocolors.gray('→ Warning message'));
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
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain('one');
			expect(result.stdout).toContain('two');
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Gray square for pending state (90m = gray/bright black)
			expect(result.stdout).toContain(yoctocolors.gray('◼'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Status appears in brackets after title
			expect(result.stdout).toContain('My task');

			// Status has dim styling (2m = dim, 22m = reset dim)
			expect(result.stdout).toContain(yoctocolors.dim('[loading]'));
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
			expect(result.stderr).toBe('');

			// Both status updates appear in output

			// Dim styling for status
			expect(result.stdout).toContain(yoctocolors.dim('[step 1]'));
			expect(result.stdout).toContain(yoctocolors.dim('[step 2]'));

			// Final output has no status brackets after clearing
			const lines = result.stdout.split('\n');
			const finalTaskLine = lines.reverse().find(line => line.includes('✔') && line.includes('Task'));
			expect(finalTaskLine).toBeTruthy();
			expect(finalTaskLine).not.toMatch(/\[step/);
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
			expect(result.stderr).toBe('');

			// All output lines should be indented at the same level (2 spaces)
			expect(result.stdout).toContain(`\n  ${yoctocolors.gray('→ line 1')}`);
			expect(result.stdout).toContain(`\n  ${yoctocolors.gray('line 2')}`);
			expect(result.stdout).toContain(`\n  ${yoctocolors.gray('line 3')}`);
		});
	});
});
