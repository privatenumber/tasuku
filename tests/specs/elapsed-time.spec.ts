import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('elapsed time', ({ test }) => {
		test('showTime option displays elapsed time', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async () => {
					await setTimeout(1500);
				}, { showTime: true });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Should show elapsed time (at least 1s)
			expect(result.stdout).toMatch(/\(1s\)|\(2s\)/);
		});

		test('time not shown if under 1 second', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async () => {
					await setTimeout(100);
				}, { showTime: true });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Should NOT show elapsed time (no seconds pattern)
			expect(result.stdout).not.toMatch(/\(\d+s\)/);
		});

		test('startTime/stopTime manual control', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async ({ startTime, stopTime }) => {
					startTime();
					await setTimeout(1500);
					const elapsed = stopTime();
					if (elapsed < 1000) {
						throw new Error('Expected elapsed >= 1000ms, got ' + elapsed);
					}
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');
			expect(result.stdout).toMatch(/\(1s\)|\(2s\)/);
		});

		test('stopTime returns elapsed milliseconds', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async ({ startTime, stopTime }) => {
					startTime();
					await setTimeout(1100);
					const elapsed = stopTime();
					console.log('ELAPSED:' + elapsed);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Extract elapsed value from console output
			const match = result.stdout.match(/ELAPSED:(\d+)/);
			expect(match).toBeTruthy();
			const elapsed = Number(match![1]);
			expect(elapsed).toBeGreaterThanOrEqual(1000);
			expect(elapsed).toBeLessThan(2000);
		});

		test('startTime restarts timer from zero', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async ({ startTime, stopTime }) => {
					startTime();
					await setTimeout(500);
					startTime(); // restart
					await setTimeout(1200);
					const elapsed = stopTime();
					console.log('ELAPSED:' + elapsed);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Should be ~1200ms, not ~1700ms
			const match = result.stdout.match(/ELAPSED:(\d+)/);
			expect(match).toBeTruthy();
			const elapsed = Number(match![1]);
			expect(elapsed).toBeGreaterThanOrEqual(1000);
			expect(elapsed).toBeLessThan(1600);
		});

		test('elapsed time freezes on task completion', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async () => {
					await setTimeout(1500);
				}, { showTime: true });

				// After task completes, the final output should have frozen time
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Final output shows checkmark with frozen time
			expect(result.stdout).toContain(yoctocolors.green('✔'));
			expect(result.stdout).toMatch(/\(1s\)|\(2s\)/);
		});

		test('elapsed time shown after status', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', async ({ setStatus }) => {
					setStatus('working');
					await setTimeout(1500);
				}, { showTime: true });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Status should appear before time
			expect(result.stdout).toMatch(/\[working\].*\(\d+s\)/);
		});

		test('stopTime returns 0 if timer was never started', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				await task('Task', async ({ stopTime }) => {
					const elapsed = stopTime();
					console.log('ELAPSED:' + elapsed);
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');
			expect(result.stdout).toContain('ELAPSED:0');
		});

		test('timer freezes on task error', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				try {
					await task('Task', async () => {
						await setTimeout(1500);
						throw new Error('intentional');
					}, { showTime: true });
				} catch {
					// Expected
				}
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');

			// Should show error state with frozen time
			expect(result.stdout).toContain(yoctocolors.red('✖'));
			expect(result.stdout).toMatch(/\(1s\)|\(2s\)/);
		});
	});
});
