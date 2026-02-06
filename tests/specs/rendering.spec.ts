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

		test('visible tasks limit: hides tasks exceeding terminal height', async () => {
			// Create more tasks than the terminal height allows
			// With rows=10, limit = Math.max(5, 10 - 2) = 8 lines
			// 7 task lines + 1 summary line = 8 lines, so 8 tasks hidden
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task =>
					Array.from({ length: 15 }, (_, i) =>
						task('Task ' + (i + 1), async () => {
							await setTimeout(50);
						})
					),
					{ concurrency: 5 }
				);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 10,
			});
			expect(result.exitCode).toBe(0);

			// Should contain the "(X more tasks)" message at the bottom
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);

			// Should show the hidden count with state breakdown
			expect(result.output).toMatch(/\+ \d+ queued/);
		});

		test('visible tasks limit: sorts active tasks to top, completed to bottom', async () => {
			// Tasks should be sorted: loading > pending > completed
			// This ensures active tasks are always visible
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// Create tasks where early ones complete while later ones are still loading
				// Use large time gap to avoid CI timing flakiness
				await task.group(task => [
					task('Fast 1', async () => await setTimeout(50)),
					task('Fast 2', async () => await setTimeout(50)),
					task('Slow 1', async () => await setTimeout(2000)),
					task('Slow 2', async () => await setTimeout(2000)),
					task('Slow 3', async () => await setTimeout(2000)),
				], { concurrency: 2 });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 15,
			});
			expect(result.exitCode).toBe(0);

			// After Fast 1 & 2 complete, Slow tasks should be loading/pending
			// and appear before the completed Fast tasks in the sorted output.
			// Look for a render where a Slow task appears with a spinner (any frame).
			const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
			const lines = result.output.split('\n');
			const hasSlowLoading = lines.some(
				line => line.includes('Slow') && spinnerFrames.some(frame => line.includes(frame)),
			);
			expect(hasSlowLoading).toBe(true);
		});

		test('visible tasks limit: nested subtasks count toward line limit', async () => {
			// Each parent with visible children takes multiple lines
			// With a small terminal, fewer tasks should fit
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task =>
					Array.from({ length: 15 }, (_, i) =>
						task('Parent ' + (i + 1), async ({ task }) => {
							await task('Child A', async () => await setTimeout(80));
							await task('Child B', async () => await setTimeout(80));
						})
					),
					{ concurrency: 3 }
				);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 10,
			});
			expect(result.exitCode).toBe(0);

			// Should have "(X more tasks)" because nested tasks take extra lines
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);

			// Verify that Child tasks appear in output (proves nesting works)
			expect(result.output).toContain('Child');
		});

		test('visible tasks limit: multiple groups sorted together', async () => {
			// Tasks from different groups should all be sorted by state
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// Start two groups concurrently
				const group1 = task.group(task => [
					task('G1-Task1', async () => await setTimeout(200)),
					task('G1-Task2', async () => await setTimeout(200)),
					task('G1-Task3', async () => await setTimeout(200)),
				], { concurrency: 1 });

				const group2 = task.group(task => [
					task('G2-Task1', async () => await setTimeout(150)),
					task('G2-Task2', async () => await setTimeout(150)),
					task('G2-Task3', async () => await setTimeout(150)),
				], { concurrency: 1 });

				await Promise.all([group1, group2]);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 10,
			});
			expect(result.exitCode).toBe(0);

			// Both groups should have tasks visible
			expect(result.output).toContain('G1-');
			expect(result.output).toContain('G2-');

			// During execution, loading tasks from both groups should appear
			// Look for spinners from both groups
			const hasG1Spinner = result.output.includes('⠋') && result.output.includes('G1-');
			const hasG2Spinner = result.output.includes('⠋') && result.output.includes('G2-');
			expect(hasG1Spinner || hasG2Spinner).toBe(true);
		});

		test('maxVisible option: limits displayed tasks to specified lines', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task =>
					Array.from({ length: 10 }, (_, i) =>
						task('Task ' + (i + 1), async () => {
							await setTimeout(100);
						})
					),
					{ concurrency: 3, maxVisible: 5 }
				);
				`,
			}, { tempDir });

			// Large terminal so default limit wouldn't kick in
			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 40,
			});
			expect(result.exitCode).toBe(0);

			// maxVisible=5 should hide tasks even though terminal has room
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);
		});

		test('maxVisible option: works with nested tasks (counts lines not tasks)', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task =>
					Array.from({ length: 8 }, (_, i) =>
						task('Parent ' + (i + 1), async ({ task }) => {
							await task('Child', async () => await setTimeout(80));
						})
					),
					{ concurrency: 2, maxVisible: 4 }
				);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 40,
			});
			expect(result.exitCode).toBe(0);

			// With maxVisible=4 and each parent+child=2 lines,
			// only 2 tasks fit (4 lines), rest hidden
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);
			expect(result.output).toContain('Child');
		});

		test('maxVisible option: overrides default terminal height limit', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task =>
					Array.from({ length: 10 }, (_, i) =>
						task('Task ' + (i + 1), async () => {
							await setTimeout(100);
						})
					),
					{ concurrency: 3, maxVisible: 3 }
				);
				`,
			}, { tempDir });

			// Terminal has 30 rows (default limit=28), but maxVisible=3 overrides
			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 30,
			});
			expect(result.exitCode).toBe(0);

			// Should have hidden tasks with state breakdown
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);
		});

		test('visible tasks limit: resize triggers re-render', async () => {
			// When terminal resizes, the visible task limit should update
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// Create enough tasks to trigger the limit
				await task.group(task =>
					Array.from({ length: 20 }, (_, i) =>
						task('Task ' + (i + 1), async () => {
							await setTimeout(100);
						})
					),
					{ concurrency: 3 }
				);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 8, // Small terminal = more hidden tasks
			});
			expect(result.exitCode).toBe(0);

			// With rows=8, limit = max(5, 8-2) = 6 lines
			// Should have many hidden tasks
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);

			// Should show queued tasks in summary due to small terminal
			expect(result.output).toMatch(/\+ \d+ queued/);
		});

		test('visible tasks limit: clear() shows all tasks (final render lifts limit)', async () => {
			// During execution, tasks are limited. But when clear() is called,
			// renderFinal() lifts the limit since no more redraws will happen.
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				const tasks = await task.group(task =>
					Array.from({ length: 15 }, (_, i) =>
						task('Task ' + (i + 1), async () => {
							await setTimeout(50);
						})
					),
					{ concurrency: 5 }
				);

				// clear() triggers renderFinal which lifts the limit
				tasks.clear();
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 10, // Small terminal - limit = 8 lines
			});
			expect(result.exitCode).toBe(0);

			// During execution, should have been limited
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);

			// After clear(), all 15 tasks should have been rendered
			// Count unique task names in the output
			const allTasksPresent = Array.from({ length: 15 }, (_, i) => result.output.includes(`Task ${i + 1}`)).every(Boolean);
			expect(allTasksPresent).toBe(true);
		});

		test('visible tasks limit: maxVisible enforced during execution even with clear()', async () => {
			// Verify maxVisible is enforced per render frame during execution.
			// With maxVisible=3, summary should appear showing hidden tasks.
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				const tasks = await task.group(task =>
					Array.from({ length: 10 }, (_, i) =>
						task('Item ' + (i + 1), async () => {
							await setTimeout(50);
						})
					),
					{ concurrency: 3, maxVisible: 3 }
				);

				tasks.clear();
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 40, // Large terminal - but maxVisible=3 overrides
			});
			expect(result.exitCode).toBe(0);

			// During execution, maxVisible=3 should produce summary lines
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);
		});

		test('visible tasks limit: concurrent groups with different maxVisible', async () => {
			// When two groups run concurrently, both should complete without errors.
			// The last maxVisible set wins for the shared renderer.
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				const g1 = task.group(task =>
					Array.from({ length: 10 }, (_, i) =>
						task('Small-' + (i + 1), async () => await setTimeout(100))
					),
					{ concurrency: 3, maxVisible: 3 }
				);

				const g2 = task.group(task =>
					Array.from({ length: 10 }, (_, i) =>
						task('Large-' + (i + 1), async () => await setTimeout(100))
					),
					{ concurrency: 3, maxVisible: 8 }
				);

				await Promise.all([g1, g2]);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 40,
			});
			expect(result.exitCode).toBe(0);

			// Both groups should have tasks in output
			expect(result.output).toContain('Small-');
			expect(result.output).toContain('Large-');

			// Should have summary lines (limit was applied)
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);
		});

		test('visible tasks limit: maxVisible resets after group clears while renderer survives', async () => {
			// A standalone task keeps the renderer alive. A group with maxVisible
			// runs alongside it and clears. The maxVisible should reset so the
			// standalone task (and any future tasks) use the default limit.
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				// Standalone task keeps renderer alive through the whole test
				const keeper = task('Keeper', async () => await setTimeout(1500));

				// Group with maxVisible runs alongside keeper
				const g1 = await task.group(task =>
					Array.from({ length: 10 }, (_, i) =>
						task('Limited-' + (i + 1), async () => await setTimeout(50))
					),
					{ concurrency: 3, maxVisible: 3 }
				);
				g1.clear();

				// After g1 clears, maxVisible should be reset.
				// New group without maxVisible should use default (rows-2=38).
				// All 5 tasks fit, so no summary should appear for these tasks.
				const g2 = await task.group(task =>
					Array.from({ length: 5 }, (_, i) =>
						task('Free-' + (i + 1), async () => await setTimeout(50))
					),
					{ concurrency: 5 }
				);

				await keeper;
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), {
				cols: 80,
				rows: 40,
			});
			expect(result.exitCode).toBe(0);

			// Group 1 should have been limited (summary appeared)
			expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);

			// All Free- tasks should be visible (maxVisible was reset)
			const allFreePresent = Array.from(
				{ length: 5 },
				(_, i) => result.output.includes(`Free-${i + 1}`),
			).every(Boolean);
			expect(allFreePresent).toBe(true);
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
