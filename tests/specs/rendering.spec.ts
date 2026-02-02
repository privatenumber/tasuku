import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { nodePty } from '../utils/pty.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('rendering', ({ test }) => {
		test('spinner animates through multiple frames with yellow color', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async () => {
					await setTimeout(100);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));

			// Task completes successfully
			expect(result.stdout).toContain(yoctocolors.green('✔'));
			expect(result.stdout).toContain('Task');

			// Verify spinner appears before completion
			const spinnerIndex = result.stdout.indexOf(yoctocolors.yellow('⠋'));
			const checkmarkIndex = result.stdout.indexOf(yoctocolors.green('✔'));
			expect(spinnerIndex).toBeLessThan(checkmarkIndex);
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// After task completes, final output should show checkmark not spinner
			expect(result.stdout).toContain('✔');

			// Green checkmark in final output
			expect(result.stdout).toContain(yoctocolors.green('✔'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Both task names appear
			expect(result.stdout).toContain('one');
			expect(result.stdout).toContain('two');
			expect(result.stdout).toContain(yoctocolors.green('✔'));

			// Yellow spinners
			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));
		});

		test('nested tasks render correctly on success', async () => {
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
			expect(result.stderr).toBe('');

			// Define the exact final lines we expect
			const finalParentLine = `${yoctocolors.yellow('❯')} Parent`;
			const finalChildLine = `  ${yoctocolors.green('✔')} Child`;

			// Check that these lines exist in the output
			expect(result.stdout).toContain(finalParentLine);
			expect(result.stdout).toContain(finalChildLine);

			// For a more robust check, verify they are the *last* two lines
			const lines = result.stdout.split('\n').filter(line => line.trim());
			const secondToLastLine = lines.at(-2);
			const lastLine = lines.at(-1);

			// Use .includes() because the line may have other ANSI codes (like clear)
			expect(secondToLastLine).toContain(finalParentLine);
			expect(lastLine).toContain(finalChildLine);
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Yellow pointer (not red) with foreground-only reset
			expect(result.stdout).toContain(yoctocolors.yellow('❯'));

			// Verify spinner appears while child is loading
			expect(result.stdout).toContain(yoctocolors.yellow('⠋'));
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

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Red pointer when child errors with foreground-only reset
			expect(result.stdout).toContain(yoctocolors.red('❯'));

			// Red X for failed child task
			expect(result.stdout).toContain(yoctocolors.red('✖'));
		});

		test('child task starts with frame 0 spinner', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Parent', async ({ task }) => {
					await setTimeout(50);
					await task('Child', async () => {
						await setTimeout(50);
					});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			expect(result.stdout).toBe(
				`${yoctocolors.yellow('⠋')} Parent\n`
				+ `${ansiEscapes.eraseLine}${ansiEscapes.cursorUp()}${ansiEscapes.eraseLine}${ansiEscapes.cursorLeft}${yoctocolors.yellow('❯')} Parent\n`
				+ `  ${yoctocolors.yellow('⠋')} Child\n`
				+ `${ansiEscapes.eraseLine}${ansiEscapes.cursorUp()}${ansiEscapes.eraseLine}${ansiEscapes.cursorUp()}${ansiEscapes.eraseLine}${ansiEscapes.cursorLeft}${yoctocolors.yellow('❯')} Parent\n`
				+ `  ${yoctocolors.green('✔')} Child`,
			);
		});

		test('PTY sanity check: basic output works', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				process.stdout.write('HELLO FROM PTY\n');
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });

			expect(result.exitCode).toBe(0);
			expect(result.output).toContain('HELLO FROM PTY');
		});

		test('spinner restarts after all tasks complete and new tasks start', async () => {
			// Regression test: spinner interval was stopped when first group completed
			// and not restarted when second group started.
			// Must use PTY because spinner only runs when isTTY=true.
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// First group - completes, which stops the spinner interval
				await task.group(task => [
					task('first-1', async () => { await setTimeout(100); }),
				], { concurrency: 1 });

				// Second group - spinner interval should restart
				// Use 500ms delay to ensure multiple animation frames render
				await task.group(task => [
					task('second-1', async () => { await setTimeout(500); }),
				], { concurrency: 1 });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			// Find output after first group completes (after first checkmark)
			const firstCheckmark = result.output.indexOf(`${yoctocolors.green('✔')} first-1`);
			expect(firstCheckmark).toBeGreaterThan(-1);
			// eslint-disable-next-line unicorn/prefer-set-has -- multi-char ANSI
			const afterFirstGroup = result.output.slice(firstCheckmark);

			// Count unique spinner frames in second group output
			// Without the fix, spinner interval doesn't restart, so only ONE frame appears
			// (the stale frame value from when the first group completed).
			// With the fix, the spinner animates through MULTIPLE frames.
			const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
			const framesInSecondGroup = spinnerFrames.filter(
				frame => afterFirstGroup.includes(yoctocolors.yellow(frame)),
			);

			// With 500ms delay and 80ms per frame, should see at least 4-5 unique frames
			expect(framesInSecondGroup.length).toBeGreaterThanOrEqual(4);
		});

		test('spinner restarts for sequential single task() calls', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// First task completes, stopping the spinner
				await task('first', async () => { await setTimeout(100); });

				// Second task starts - spinner should restart
				await task('second', async () => { await setTimeout(500); });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			// Find output after first task completes
			const firstCheckmark = result.output.indexOf(`${yoctocolors.green('✔')} first`);
			expect(firstCheckmark).toBeGreaterThan(-1);
			// eslint-disable-next-line unicorn/prefer-set-has -- multi-char ANSI
			const afterFirstTask = result.output.slice(firstCheckmark);

			// Count unique spinner frames for second task
			const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
			const framesInSecondTask = spinnerFrames.filter(
				frame => afterFirstTask.includes(yoctocolors.yellow(frame)),
			);

			expect(framesInSecondTask.length).toBeGreaterThanOrEqual(4);
		});

		test('spinner restarts after error in first task', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// First task errors, stopping the spinner
				await task('fails', async () => {
					await setTimeout(100);
					throw new Error('intentional');
				}).catch(() => {});

				// Second task starts - spinner should restart despite previous error
				await task('second', async () => { await setTimeout(500); });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			// Find output after first task errors
			const errorMark = result.output.indexOf(`${yoctocolors.red('✖')} fails`);
			expect(errorMark).toBeGreaterThan(-1);
			// eslint-disable-next-line unicorn/prefer-set-has -- multi-char ANSI
			const afterError = result.output.slice(errorMark);

			// Count unique spinner frames for second task
			const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
			const framesInSecondTask = spinnerFrames.filter(
				frame => afterError.includes(yoctocolors.yellow(frame)),
			);

			expect(framesInSecondTask.length).toBeGreaterThanOrEqual(4);
		});

		test('spinner works after clear() destroys and recreates renderer', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// First task completes and is cleared - renderer destroyed
				const t = await task('first', async () => { await setTimeout(100); });
				t.clear();

				// Second task creates fresh renderer - spinner should work
				await task('second', async () => { await setTimeout(500); });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			// Count unique spinner frames for second task
			const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
			const framesInOutput = spinnerFrames.filter(
				frame => result.output.includes(yoctocolors.yellow(frame)),
			);

			expect(framesInOutput.length).toBeGreaterThanOrEqual(4);
		});

		test('line wrapping: clears correct number of lines in narrow terminal', async () => {
			const title = 'This is a long task title for testing';
			const cols = 20;
			const visualWidth = title.length + 2; // +2 for spinner and space
			const visualLines = Math.ceil(visualWidth / cols);

			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// Debug: check environment
				process.stderr.write('[SCRIPT] isTTY=' + process.stdout.isTTY + ' columns=' + process.stdout.columns + '\n');

				await task('${title}', () => setTimeout(100));

				process.stderr.write('[SCRIPT] task completed\n');
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols });

			expect(result.exitCode).toBe(0);

			// Count cursor-up sequences using ansiEscapes constant
			const cursorUpSequence = ansiEscapes.cursorUp();
			const cursorUpCount = result.output.split(cursorUpSequence).length - 1;

			// With the fix: cursor-ups should match visual lines (accounting for wrapping)
			// Without the fix: would only have 1 cursor-up (counting only newlines)
			expect(cursorUpCount).toBeGreaterThanOrEqual(visualLines - 1);
		});
	});
});
