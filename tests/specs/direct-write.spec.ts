import {
	describe, test, expect, onTestFail,
} from 'manten';
import { createFixture } from 'fs-fixture';
import { nodePty } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';
import { getTerminalGrid } from '../utils/ansi-terminal.ts';

// Output written directly to the terminal during a task via a raw
// process.std{out,err}.write (bypassing console.*) must be preserved, not erased
// by the next repaint. (Child processes writing to an inherited OS fd can't be
// intercepted from JS — streamPreview is the path for child output.)
describe('direct terminal writes during a task', () => {
	const directWriteFixture = (entry: string, stream = 'stderr') => ({
		'test.mjs': String.raw`
		import task from '${entry}';
		const blockFor = (ms) => { const end = Date.now() + ms; while (Date.now() < end) {} };

		await task('Task', async ({ setStatus }) => {
			setStatus('working');
			process.${stream}.write('KEEPME\n');
			blockFor(200);
		});
		`,
	});

	test('pinned: raw process.stderr.write is preserved after a state change', async () => {
		await using fixture = await createFixture(directWriteFixture('#tasuku'), { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const grid = getTerminalGrid(result.output);

		onTestFail(() => {
			console.log({
				grid,
				output: result.output,
			});
		});

		expect(grid.some(row => row.includes('KEEPME'))).toBe(true);
	}, { retry: 3 });

	test('inline: raw process.stderr.write is preserved after a state change', async () => {
		await using fixture = await createFixture(directWriteFixture('#tasuku/inline'), { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const grid = getTerminalGrid(result.output);

		onTestFail(() => {
			console.log({
				grid,
				output: result.output,
			});
		});

		expect(grid.some(row => row.includes('KEEPME'))).toBe(true);
	}, { retry: 3 });

	// In a shared TTY, stdout and stderr move the same cursor, so a raw write to
	// the sibling stream must be coordinated too (the pinned UI renders to stderr).
	test('pinned: raw process.stdout.write (sibling stream) is preserved', async () => {
		await using fixture = await createFixture(directWriteFixture('#tasuku', 'stdout'), { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const grid = getTerminalGrid(result.output);

		onTestFail(() => {
			console.log({
				grid,
				output: result.output,
			});
		});

		expect(grid.some(row => row.includes('KEEPME'))).toBe(true);
	}, { retry: 3 });

	// console.* (patch-console) and raw writes (interceptStream) are separate
	// coordination paths — both must survive when interleaved in one task.
	test('pinned: interleaved console.log and raw write are both preserved', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';
			const blockFor = (ms) => { const end = Date.now() + ms; while (Date.now() < end) {} };

			await task('Task', async ({ setStatus }) => {
				setStatus('working');
				console.log('LOG_LINE');
				process.stderr.write('RAW_LINE\n');
				blockFor(200);
			});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const grid = getTerminalGrid(result.output);

		onTestFail(() => {
			console.log({
				grid,
				output: result.output,
			});
		});

		expect(grid.some(row => row.includes('LOG_LINE'))).toBe(true);
		expect(grid.some(row => row.includes('RAW_LINE'))).toBe(true);
		expect(grid.some(row => row.includes('Task'))).toBe(true);
	}, { retry: 3 });

	// Raw write from inside a nested child task (grouped/nested execution).
	test('pinned: raw write inside a nested child task is preserved', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';
			const blockFor = (ms) => { const end = Date.now() + ms; while (Date.now() < end) {} };

			await task('Parent', async () => {
				await task('Child', async ({ setStatus }) => {
					setStatus('working');
					process.stderr.write('NESTED_KEEP\n');
					blockFor(200);
				});
			});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 80 });
		const grid = getTerminalGrid(result.output);

		onTestFail(() => {
			console.log({
				grid,
				output: result.output,
			});
		});

		expect(grid.some(row => row.includes('NESTED_KEEP'))).toBe(true);
	}, { retry: 3 });
});
