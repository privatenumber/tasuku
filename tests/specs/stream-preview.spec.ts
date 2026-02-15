import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { nodePty } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';

describe('stream preview', () => {
	test('pipes process output as task preview', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import { Readable } from 'node:stream';
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				const stream = Readable.from(['line 1\n', 'line 2\n', 'line 3\n']);
				stream.pipe(streamPreview);
				await new Promise(resolve => streamPreview.on('finish', resolve));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('line 1')}`);
		expect(result.stderr).toContain(ansis.gray('line 2'));
		expect(result.stderr).toContain(ansis.gray('line 3'));
	});

	test('shows last 5 lines by default with truncation indicator', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				for (let i = 1; i <= 10; i++) {
					streamPreview.write('line ' + i + '\n');
				}
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Should show last 5 lines
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('line 6')}`);
		expect(result.stderr).toContain(ansis.gray('line 10'));

		// Check the truncation indicator
		expect(result.stderr).toContain(ansis.gray('(+ 5 lines)'));
	});

	test('custom previewLines option', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				for (let i = 1; i <= 10; i++) {
					streamPreview.write('line ' + i + '\n');
				}
				await new Promise(resolve => setTimeout(resolve, 50));
			}, { previewLines: 3 });
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Should show last 3 lines
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('line 8')}`);
		expect(result.stderr).toContain(ansis.gray('line 10'));

		// 7 lines truncated
		expect(result.stderr).toContain(ansis.gray('(+ 7 lines)'));
	});

	test('previewLines clamped to minimum 1', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				for (let i = 1; i <= 5; i++) {
					streamPreview.write('line ' + i + '\n');
				}
				await new Promise(resolve => setTimeout(resolve, 50));
			}, { previewLines: 0 });
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Should show at least 1 line (clamped from 0)
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('line 5')}`);

		// 4 lines truncated (5 total - 1 visible)
		expect(result.stderr).toContain(ansis.gray('(+ 4 lines)'));
	});

	test('handles partial line buffering', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				// Write chunks that don't align to line boundaries
				streamPreview.write('hel');
				streamPreview.write('lo world\nfoo');
				streamPreview.write(' bar\n');
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('hello world')}`);
		expect(result.stderr).toContain(ansis.gray('foo bar'));
	});

	test('handles carriage return for in-place updates', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				// Simulate curl-style progress: \r overwrites current line
				streamPreview.write('progress 0%');
				streamPreview.write('\rprogress 50%');
				streamPreview.write('\rprogress 100%\n');
				streamPreview.write('done\n');
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Final state should show the last \r-overwritten value and the done line
		expect(result.stderr).toContain(ansis.gray('progress 100%'));
		expect(result.stderr).toContain(ansis.gray('done'));

		// Earlier overwritten values should not appear in the final output
		expect(result.stderr).not.toContain('progress 0%');
		expect(result.stderr).not.toContain('progress 50%');
	});

	test('handles chunks ending with trailing carriage return', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				// Simulate curl: each chunk ends with \r, no \n
				streamPreview.write('frame 1\r');
				streamPreview.write('frame 2\r');
				streamPreview.write('frame 3\r');
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Should display the last frame (each \r overwrites the previous)
		expect(result.stderr).toContain(ansis.gray('frame 3'));

		// Earlier frames should be overwritten
		expect(result.stderr).not.toContain('frame 1');
		expect(result.stderr).not.toContain('frame 2');
	});

	test('trailing carriage return stripped on stream end', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import { Readable } from 'node:stream';
			import { pipeline } from 'node:stream/promises';
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				// Stream ends with \r — final() must strip it
				const stream = Readable.from(['frame 1\r', 'frame 2\r']);
				await pipeline(stream, streamPreview);
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Final output should show last frame without raw \r
		expect(result.stderr).toContain(ansis.gray('frame 2'));
		expect(result.stderr).not.toContain('\r');
	});

	test('preserves ANSI colors from piped output', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				// Simulate colored process output (e.g. jest, webpack)
				streamPreview.write('\x1B[32msuccess\x1B[39m message\n');
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Original ANSI colors should be preserved in the output
		// (ansis wraps with secondary color, so inner green overrides then secondary restores)
		expect(result.stderr).toContain('\x1B[32msuccess');
	});

	test('no truncation indicator when lines fit within limit', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				streamPreview.write('line 1\n');
				streamPreview.write('line 2\n');
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('line 1')}`);
		expect(result.stderr).toContain(ansis.gray('line 2'));
		expect(result.stderr).not.toContain('+ ');
	});

	test('setOutput and streamPreview coexist', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview, setOutput }) => {
				streamPreview.write('stream line 1\n');
				streamPreview.write('stream line 2\n');
				await new Promise(resolve => setTimeout(resolve, 50));
				setOutput('static output');
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// Both should be present: static output with → prefix, stream with ⎿ prefix
		expect(result.stderr).toContain(ansis.gray('\u2192 static output'));
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('stream line 1')}`);
		expect(result.stderr).toContain(ansis.gray('stream line 2'));

		// Static output should appear before stream output
		const staticIndex = result.stderr.lastIndexOf('\u2192 static output');
		const streamIndex = result.stderr.lastIndexOf('\u23BF');
		expect(staticIndex).toBeLessThan(streamIndex);
	});

	test('final flush triggers maxLines overflow shift', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { Readable } from 'node:stream';
			import { pipeline } from 'node:stream/promises';
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				// 5 complete lines fill the default maxLines=5, then
				// a partial line (no trailing newline) triggers final() overflow
				const stream = Readable.from([
					'line 1\\nline 2\\nline 3\\nline 4\\nline 5\\n',
					'partial line 6',
				]);
				await pipeline(stream, streamPreview);
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		// line 1 should be shifted out (6 lines, maxLines=5)
		expect(result.stderr).not.toContain('line 1');

		// line 2 should be the first visible line (with prefix)
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('line 2')}`);

		// partial line 6 should be flushed by final()
		expect(result.stderr).toContain(ansis.gray('partial line 6'));

		// 1 line truncated
		expect(result.stderr).toContain(ansis.gray('(+ 1 lines)'));
	});

	test('flushes partial line on stream end', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { Readable } from 'node:stream';
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				// Write without trailing newline
				const stream = Readable.from(['no trailing newline']);
				stream.pipe(streamPreview);
				await new Promise(resolve => streamPreview.on('finish', resolve));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('no trailing newline')}`);
	});

	test('clear removes preview output', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				for (let i = 1; i <= 8; i++) {
					streamPreview.write('line ' + i + '\n');
				}
				await new Promise(resolve => setTimeout(resolve, 50));
			}).clear();
			console.log('AFTER_CLEAR');
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toContain('AFTER_CLEAR');

		// After clearing, preview lines should not be in final stderr output
		const parts = result.stderr.split(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
		const afterClear = parts.at(-1) ?? '';
		expect(afterClear).not.toContain('Task');
		expect(afterClear).not.toContain('line');

		// ANSI save/restore codes should be present
		expect(result.stderr).toContain(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
	});

	test('preview lines count toward maxVisible limit', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			// 3 tasks, each with 3-line preview = 3 title lines + 9 preview lines + 3 truncation lines = 15+ lines
			await task.group(task => [
				task('Task A', async ({ streamPreview }) => {
					for (let i = 1; i <= 5; i++) {
						streamPreview.write('A-' + i + '\n');
					}
					await setTimeout(200);
				}, { previewLines: 3 }),
				task('Task B', async ({ streamPreview }) => {
					for (let i = 1; i <= 5; i++) {
						streamPreview.write('B-' + i + '\n');
					}
					await setTimeout(200);
				}, { previewLines: 3 }),
				task('Task C', async ({ streamPreview }) => {
					for (let i = 1; i <= 5; i++) {
						streamPreview.write('C-' + i + '\n');
					}
					await setTimeout(200);
				}, { previewLines: 3 }),
			], { concurrency: 3 });
			`,
		}, { tempDir });

		// Small terminal - preview lines should push tasks into hidden
		const result = await nodePty(fixture.getPath('test.mjs'), {
			cols: 80,
			rows: 10,
		});
		expect(result.exitCode).toBe(0);

		// With rows=10 and 3 tasks each having preview lines,
		// some tasks should be hidden
		expect(result.output).toMatch(/\(\+ \d+ (queued|completed|loading)/);
	}, { retry: 3 });

	test('CI mode shows final preview state', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task', async ({ streamPreview }) => {
				for (let i = 1; i <= 8; i++) {
					streamPreview.write('line ' + i + '\n');
				}
				await new Promise(resolve => setTimeout(resolve, 50));
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'), {
			CI: '1',
		});
		expect(result.stdout).toBe('');

		// CI shows final state with colors
		expect(result.stderr).toContain(`\u23BF  ${ansis.gray('line 4')}`);
		expect(result.stderr).toContain(ansis.gray('line 8'));
		expect(result.stderr).toContain(ansis.gray('(+ 3 lines)'));
	});
});
