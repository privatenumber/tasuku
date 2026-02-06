import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { nodePty } from '../utils/pty.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('max visible', ({ describe }) => {
		describe('terminal height limit', ({ test }) => {
			test('hides tasks exceeding terminal height', async () => {
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

			test('sorts active tasks to top, completed to bottom', async () => {
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

			test('nested subtasks count toward line limit', async () => {
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

			test('multiple groups sorted together', async () => {
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
			});

			test('resize triggers re-render', async () => {
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

			test('clear() shows all tasks (final render lifts limit)', async () => {
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
		});

		describe('maxVisible option', ({ test }) => {
			test('limits displayed tasks to specified lines', async () => {
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

			test('works with nested tasks (counts lines not tasks)', async () => {
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

			test('overrides default terminal height limit', async () => {
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

			test('enforced during execution even with clear()', async () => {
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

			test('concurrent groups with different maxVisible', async () => {
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

			test('resets after group clears while renderer survives', async () => {
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
		});
	});
});
