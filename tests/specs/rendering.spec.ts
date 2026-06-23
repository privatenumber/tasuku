import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { nodePty, waitFor } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';

describe('rendering', () => {
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
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain(ansis.yellow('⠋'));
		expect(result.stderr).toContain(ansis.green('✔'));
		expect(result.stderr).toContain('Task');

		const spinnerIndex = result.stderr.indexOf(ansis.yellow('⠋'));
		const checkmarkIndex = result.stderr.indexOf(ansis.green('✔'));
		expect(spinnerIndex).toBeLessThan(checkmarkIndex);
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
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('one');
		expect(result.stderr).toContain('two');
		expect(result.stderr).toContain(ansis.green('✔'));
		expect(result.stderr).toContain(ansis.yellow('⠋'));
	});

	test('nested tasks render correctly on success', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('Parent', async () => {
				await task('Child', async () => {
					await setTimeout(50);
				});
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		const finalParentLine = `${ansis.yellow('❯')} Parent`;
		const finalChildLine = `  ${ansis.green('✔')} Child`;

		expect(result.stderr).toContain(finalParentLine);
		expect(result.stderr).toContain(finalChildLine);

		// Verify they are the *last* two lines
		const lines = result.stderr.split('\n').filter(line => line.trim());
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

			await task('Parent', async () => {
				await task('Child', async () => {
					await setTimeout(150);
				});
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain(ansis.yellow('❯'));
		expect(result.stderr).toContain(ansis.yellow('⠋'));
	});

	test('parent task shows red pointer on error', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			try {
				await task('Parent', async () => {
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
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain(ansis.red('❯'));
		expect(result.stderr).toContain(ansis.red('✖'));
	});

	test('child task starts with frame 0 spinner', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('Parent', async () => {
				await setTimeout(50);
				await task('Child', async () => {
					await setTimeout(50);
				});
			});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toBe(
			`${ansiEscapes.cursorSavePosition}${ansis.yellow('⠋')} Parent\n`
			+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.yellow('❯')} Parent\n`
			+ `  ${ansis.yellow('⠋')} Child\n`
			+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.yellow('❯')} Parent\n`
			+ `  ${ansis.green('✔')} Child`,
		);
	});

	test('sequential tasks preserve insertion order', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			// First task completes, stays visible
			await task('First task', async () => {
				await setTimeout(50);
			});
			// Second task starts — both visible, different states
			await task('Second task', async () => {
				await setTimeout(200);
			});
			`,
		}, { tempDir });

		const subprocess = nodePty(fixture.getPath('test.mjs'));
		let capturedOutput = '';
		await waitFor(subprocess, (output) => {
			if (output.includes('Second task') && output.includes('First task')) {
				capturedOutput = output;
				return true;
			}
			return false;
		});
		// In the last frame, completed "First task" should appear before loading "Second task"
		const lastFirst = capturedOutput.lastIndexOf('First task');
		const lastSecond = capturedOutput.lastIndexOf('Second task');
		expect(lastFirst).toBeLessThan(lastSecond);
		const result = await subprocess;
		expect(result.exitCode).toBe(0);
	}, { retry: 3 });

	test('line wrapping: save/restore clears correctly in narrow terminal', async () => {
		const title = 'This is a long task title for testing';
		const cols = 20;

		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('${title}', () => setTimeout(100));
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols });

		expect(result.exitCode).toBe(0);
		expect(result.output).toContain(ansiEscapes.cursorRestorePosition);
		expect(result.output).toContain(ansiEscapes.eraseDown);
		expect(result.output).toContain('✔');
		expect(result.output).toContain(title);
	}, { retry: 3 });

	test('re-anchor accounts for visual line wraps from multiline status', async () => {
		const cols = 40;
		const title = 'Installing dependencies and building project';
		const statusLine1 = 'step 1';
		const statusLine2 = 'processing...';

		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('${title}', async ({ setStatus }) => {
				for (let i = 0; i < 3; i++) {
					setStatus('${statusLine1}\n${statusLine2}');
					await setTimeout(100);
				}
			});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'), { cols });
		expect(result.exitCode).toBe(0);

		// Rendered format: "{icon} {title} [{statusLine1}\n{statusLine2}]\n"
		const firstLineWidth = `X ${title} [${statusLine1}`.length;
		const secondLineWidth = `${statusLine2}]`.length;
		const expectedVisualLines = Math.ceil(firstLineWidth / cols)
			+ Math.ceil(secondLineWidth / cols);

		expect(firstLineWidth).toBeGreaterThan(cols);

		// eslint-disable-next-line no-control-regex -- matching ANSI cursorUp sequences
		const cursorUpValues = [...result.output.matchAll(/\u001B\[(\d+)A/g)]
			.map(match => Number(match[1]));

		// The task paints a title-only frame before the first setStatus, which
		// wraps to fewer rows (a smaller cursorUp). Every frame that includes the
		// multiline status must re-anchor the full wrapped height: assert the
		// largest re-anchor equals the wrapped line count (catches under- and
		// over-counting of the status frames).
		expect(cursorUpValues.length).toBeGreaterThan(0);
		expect(Math.max(...cursorUpValues)).toBe(expectedVisualLines);
	}, { retry: 3 });

	test('final grid shows correct layout for nested tasks', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('Parent', async () => {
				await task('Child A', async () => { await setTimeout(50); });
				await task('Child B', async () => { await setTimeout(50); });
			});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'));
		expect(result.exitCode).toBe(0);

		const { getTerminalGrid } = await import('../utils/ansi-terminal.ts');
		const grid = getTerminalGrid(result.output);
		// Final grid should show parent with both children
		const parentRow = grid.find(row => row.includes('Parent'));
		const childARow = grid.find(row => row.includes('Child A'));
		const childBRow = grid.find(row => row.includes('Child B'));

		expect(parentRow).toContain('❯');
		expect(parentRow).toContain('Parent');
		expect(childARow).toContain('✔');
		expect(childARow).toContain('Child A');
		expect(childBRow).toContain('✔');
		expect(childBRow).toContain('Child B');

		// Parent should be above children
		const parentIndex = grid.indexOf(parentRow!);
		const childAIndex = grid.indexOf(childARow!);
		const childBIndex = grid.indexOf(childBRow!);
		expect(parentIndex).toBeLessThan(childAIndex);
		expect(childAIndex).toBeLessThan(childBIndex);
	}, { retry: 3 });
});
