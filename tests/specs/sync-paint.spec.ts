import { Writable } from 'node:stream';
import {
	describe, test, expect, onTestFail,
} from 'manten';
import { createFixture } from 'fs-fixture';
import stripAnsi from 'strip-ansi';
import { createTasuku } from '#tasuku/create';
import type { RendererFactory } from '#tasuku';
import { nodePty } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';

// A renderer that counts how it's asked to render instead of writing anything.
// triggerRender = throttled/deferred path, flushRender = immediate paint.
const countingRenderer = () => {
	const counts = {
		trigger: 0,
		flush: 0,
	};
	const renderer: RendererFactory = () => ({
		triggerRender: () => { counts.trigger += 1; },
		flushRender: () => { counts.flush += 1; },
		renderFinal: () => {},
		destroy: () => {},
		setMaxVisible: () => {},
	});
	return {
		counts,
		renderer,
	};
};

const nullStream = () => new Writable({
	write: (_chunk, _encoding, callback) => { callback(); },
}) as NodeJS.WriteStream;

describe('synchronous-first painting', () => {
	// The core fix: a status set right before CPU-bound synchronous work must be
	// visible before the block, even though the spinner can't animate during it.
	test('status paints before synchronous blocking work', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';
			const blockFor = (ms) => { const end = Date.now() + ms; while (Date.now() < end) {} };

			await task('Task', async ({ setStatus }) => {
				setStatus('WORKING');
				process.stderr.write('MARKER\n');
				blockFor(500);
			});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const plain = stripAnsi(result.output);
		const workingIndex = plain.indexOf('WORKING');
		const markerIndex = plain.indexOf('MARKER');

		onTestFail(() => {
			console.log({
				plain,
				workingIndex,
				markerIndex,
			});
		});

		expect(workingIndex).toBeGreaterThan(-1);
		expect(markerIndex).toBeGreaterThan(-1);
		expect(workingIndex).toBeLessThan(markerIndex);
	}, { retry: 3 });

	// Task start paints before the callback runs, so a task that blocks without
	// ever setting a status is still visible during the block.
	test('a task with no status is visible before synchronous blocking work', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';
			const blockFor = (ms) => { const end = Date.now() + ms; while (Date.now() < end) {} };

			await task('BareTask', async () => {
				process.stderr.write('MARKER\n');
				blockFor(500);
			});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const plain = stripAnsi(result.output);
		const titleIndex = plain.indexOf('BareTask');
		const markerIndex = plain.indexOf('MARKER');

		onTestFail(() => {
			console.log({
				plain,
				titleIndex,
				markerIndex,
			});
		});

		expect(titleIndex).toBeGreaterThan(-1);
		expect(markerIndex).toBeGreaterThan(-1);
		expect(titleIndex).toBeLessThan(markerIndex);
	}, { retry: 3 });

	// setWarning changes output and state together; it must paint a single frame
	// (warning icon with its message), never a transient loading frame with the
	// message already showing under it.
	test('setWarning paints an atomic frame (no transient loading frame)', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			const blockFor = (ms) => { const end = Date.now() + ms; while (Date.now() < end) {} };

			await task('Task', async ({ setWarning }) => {
				setWarning('WARNMSG');
				blockFor(500);
			});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const plain = stripAnsi(result.output);
		const iconIndex = plain.indexOf('\u26A0'); // ⚠
		const messageIndex = plain.indexOf('WARNMSG');

		onTestFail(() => {
			console.log({
				plain,
				iconIndex,
				messageIndex,
			});
		});

		// The warning message never appears before its icon — proves no frame
		// rendered the message while the task was still in the loading state.
		expect(iconIndex).toBeGreaterThan(-1);
		expect(messageIndex).toBeGreaterThan(-1);
		expect(iconIndex).toBeLessThanOrEqual(messageIndex);
	}, { retry: 3 });

	// Don't waste work: repeated identical setStatus must not re-paint.
	test('repeated identical setStatus does not re-paint', async () => {
		const { counts, renderer } = countingRenderer();
		const task = createTasuku({
			renderer,
			outputStream: nullStream(),
		});

		let afterFirst = 0;
		let afterRepeats = 0;
		await task('Task', async ({ setStatus }) => {
			setStatus('same');
			afterFirst = counts.flush;
			setStatus('same');
			setStatus('same');
			afterRepeats = counts.flush;
		});

		expect(afterRepeats).toBe(afterFirst);
	});

	test('distinct setStatus values each paint once', async () => {
		const { counts, renderer } = countingRenderer();
		const task = createTasuku({
			renderer,
			outputStream: nullStream(),
		});

		let afterFirst = 0;
		let afterDistinct = 0;
		await task('Task', async ({ setStatus }) => {
			setStatus('a');
			afterFirst = counts.flush;
			setStatus('b');
			setStatus('c');
			afterDistinct = counts.flush;
		});

		expect(afterDistinct).toBe(afterFirst + 2);
	});

	// Stream preview is high-frequency: it renders on the throttled path
	// (triggerRender), never via an immediate paint (flushRender).
	test('streamPreview writes use the throttled path, not immediate paint', async () => {
		const { counts, renderer } = countingRenderer();
		const task = createTasuku({
			renderer,
			outputStream: nullStream(),
		});

		let flushBefore = 0;
		let triggerBefore = 0;
		let flushAfter = 0;
		let triggerAfter = 0;
		await task('Task', async ({ streamPreview }) => {
			flushBefore = counts.flush;
			triggerBefore = counts.trigger;
			streamPreview.write('line a\nline b\nline c\n');
			flushAfter = counts.flush;
			triggerAfter = counts.trigger;
		});

		expect(triggerAfter).toBeGreaterThan(triggerBefore);
		expect(flushAfter).toBe(flushBefore);
	});
});
