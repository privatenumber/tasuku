import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansis from 'ansis';
import { nodePty } from '../utils/pty.js';
import { tempDir } from '../utils/temp-dir.js';

const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

const countSpinnerFramesAfter = (output: string, marker: string) => {
	const markerIndex = output.indexOf(marker);
	expect(markerIndex).toBeGreaterThan(-1);
	// eslint-disable-next-line unicorn/prefer-set-has -- multi-char ANSI
	const afterMarker = output.slice(markerIndex);
	return spinnerFrames.filter(
		frame => afterMarker.includes(ansis.yellow(frame)),
	).length;
};

export default testSuite(({ describe }) => {
	describe('spinner restart', ({ test }) => {
		test('restarts after all tasks complete and new tasks start', async () => {
			// Regression test: spinner interval was stopped when first group completed
			// and not restarted when second group started.
			// Must use PTY because spinner only runs when isTTY=true.
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task => [
					task('first-1', async () => { await setTimeout(100); }),
				], { concurrency: 1 });

				await task.group(task => [
					task('second-1', async () => { await setTimeout(500); }),
				], { concurrency: 1 });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			// Multiple unique frames proves the spinner restarted (not a stale single frame)
			const frameCount = countSpinnerFramesAfter(result.output, `${ansis.green('✔')} first-1`);
			expect(frameCount).toBeGreaterThanOrEqual(2);
		});

		test('restarts for sequential single task() calls', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('first', async () => { await setTimeout(100); });
				await task('second', async () => { await setTimeout(500); });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			const frameCount = countSpinnerFramesAfter(result.output, `${ansis.green('✔')} first`);
			expect(frameCount).toBeGreaterThanOrEqual(2);
		});

		test('restarts after error in first task', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('fails', async () => {
					await setTimeout(100);
					throw new Error('intentional');
				}).catch(() => {});

				await task('second', async () => { await setTimeout(500); });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			const frameCount = countSpinnerFramesAfter(result.output, `${ansis.red('✖')} fails`);
			expect(frameCount).toBeGreaterThanOrEqual(2);
		});

		test('works after clear() destroys and recreates renderer', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				const t = await task('first', async () => { await setTimeout(100); });
				t.clear();

				await task('second', async () => { await setTimeout(500); });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
			expect(result.exitCode).toBe(0);

			// Count frames in entire output since first task was cleared
			const framesInOutput = spinnerFrames.filter(
				frame => result.output.includes(ansis.yellow(frame)),
			).length;
			expect(framesInOutput).toBeGreaterThanOrEqual(2);
		});
	});
});
