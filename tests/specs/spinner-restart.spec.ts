import { describe, test, expect, onTestFail } from 'manten';
import { createFixture } from 'fs-fixture';
import ansis from 'ansis';
import { nodePty } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';
import { spinnerFrames } from '../utils/spinner-frames.ts';

/**
 * PTY tests use { retry: 3 } because of a known node-pty bug
 * (https://github.com/microsoft/node-pty/issues/72) where onExit can fire
 * before all onData events are delivered. Under heavy concurrent PTY load,
 * this escalates to zero data delivered. The issue is all-or-nothing: when
 * data IS delivered, it arrives completely. Retries handle this cleanly.
 */

const countSpinnerFramesAfter = (output: string, marker: string) => {
	const markerIndex = output.indexOf(marker);
	if (markerIndex === -1) {
		return {
			markerFound: false as const,
			framesFound: 0,
		};
	}
	// eslint-disable-next-line unicorn/prefer-set-has -- substring search, not membership check
	const afterMarker = output.slice(markerIndex);
	return {
		markerFound: true as const,
		framesFound: spinnerFrames.filter(
			frame => afterMarker.includes(ansis.yellow(frame)),
		).length,
	};
};

describe('spinner restart', () => {
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

		const marker = `${ansis.green('✔')} first-1`;
		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const observed = countSpinnerFramesAfter(result.output, marker);

		onTestFail(() => {
			console.log({
				marker,
				...observed,
				exitCode: result.exitCode,
				outputLength: result.output.length,
				output: result.output,
			});
		});

		expect(result.exitCode).toBe(0);
		expect(observed.markerFound).toBe(true);
		expect(observed.framesFound).toBeGreaterThanOrEqual(2);
	}, { retry: 3 });

	test('restarts for sequential single task() calls', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('first', async () => { await setTimeout(100); });
			await task('second', async () => { await setTimeout(500); });
			`,
		}, { tempDir });

		const marker = `${ansis.green('✔')} first`;
		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const observed = countSpinnerFramesAfter(result.output, marker);

		onTestFail(() => {
			console.log({
				marker,
				...observed,
				exitCode: result.exitCode,
				outputLength: result.output.length,
				output: result.output,
			});
		});

		expect(result.exitCode).toBe(0);
		expect(observed.markerFound).toBe(true);
		expect(observed.framesFound).toBeGreaterThanOrEqual(2);
	}, { retry: 3 });

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

		const marker = `${ansis.red('✖')} fails`;
		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const observed = countSpinnerFramesAfter(result.output, marker);

		onTestFail(() => {
			console.log({
				marker,
				...observed,
				exitCode: result.exitCode,
				outputLength: result.output.length,
				output: result.output,
			});
		});

		expect(result.exitCode).toBe(0);
		expect(observed.markerFound).toBe(true);
		expect(observed.framesFound).toBeGreaterThanOrEqual(2);
	}, { retry: 3 });

	test('works after clear() destroys and recreates renderer', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('first', async () => { await setTimeout(100); }).clear();

			await task('second', async () => { await setTimeout(500); });
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });

		// Count frames in entire output since first task was cleared
		const framesFound = spinnerFrames.filter(
			frame => result.output.includes(ansis.yellow(frame)),
		).length;

		onTestFail(() => {
			console.log({
				framesFound,
				exitCode: result.exitCode,
				outputLength: result.output.length,
				output: result.output,
			});
		});

		expect(result.exitCode).toBe(0);
		expect(framesFound).toBeGreaterThanOrEqual(2);
	}, { retry: 3 });
});
