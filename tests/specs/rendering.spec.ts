import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import stripAnsi from 'strip-ansi';
import unicodeGraphemes from '@xterm/addon-unicode-graphemes';
import { node } from '../utils/node.ts';
import { nodePty, waitFor } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';
import { createTerminal } from '../utils/terminal.ts';

const pinnedSetup = String.raw`
	import { Writable } from 'node:stream';
	import { pinned } from '#tasuku/create';
	let output = '';
	const stream = new Writable({
		write(chunk, encoding, callback) {
			output += chunk;
			callback();
		},
	});
	Object.assign(stream, { isTTY: true, ...dimensions });
	const tasks = [];
	const renderer = pinned(tasks, stream);
`;

const completedResults = Array.from({ length: 16 }, (_, index) => `[passed] CASE-${index}`).join('\n');

describe('rendering', () => {
	test('CI terminal preserves completed task output beyond the viewport', async () => {
		const taskOutput = `${Array.from({ length: 12 }, (_, index) => `line ${index}`).join('\n')}\nIMPORTANT FINAL DETAIL`;
		await using fixture = await createFixture({
			'test.mjs': String.raw`
				import { createTasuku } from '#tasuku/create';
				import { setTimeout } from 'node:timers/promises';
				const dimensions = { columns: 30, rows: 8 };
				${pinnedSetup}
				renderer.destroy();
				const task = createTasuku({ renderer: pinned, outputStream: stream });
				await task('Build', ({ setOutput }) => {
					setOutput(${JSON.stringify(taskOutput)});
				});
				await setTimeout(50);
				process.stdout.write(output);
			`,
		}, { tempDir });
		const result = await node(fixture.getPath('test.mjs'), { CI: 'true' });
		expect(result.stderr).toBe('');
		expect(stripAnsi(result.stdout)).toContain(taskOutput.split('\n').map((line, index) => `${index === 0 ? '  → ' : '    '}${line}`).join('\n'));
		expect(result.stdout).not.toContain('\u001B]8;;');
	});

	for (const scenario of [
		...['❤️', '👨‍👩‍👧‍👦', '👩🏽‍💻', '❤\u001B[31m️\u001B[39m', '👨\u001B[31m‍👩‍👧‍👦\u001B[39m'].map(glyph => ({
			glyph,
			count: 100,
			suffix: '',
		})),
		{
			glyph: '❤\u001B[31m️\u001B[39m',
			count: 20,
			suffix: '',
		},
		{
			glyph: '❤\u001B[31m️\u001B[39m',
			count: 29,
			suffix: '',
		},
		{
			glyph: '❤\u001B[31m️\u001B[39m',
			count: 20,
			suffix: `\n${'x'.repeat(100)}`,
		},
	]) {
		test(`${scenario.count} ${stripAnsi(scenario.glyph)} ${scenario.glyph.includes('\u001B') ? 'styled' : 'plain'} graphemes with ${scenario.suffix ? 'multiline' : 'single-line'} output preserve preceding output`, async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
					const dimensions = { columns: 20, rows: 5 };
					${pinnedSetup}
					stream.write('KEEP\n');
					tasks.push({ title: ${JSON.stringify(scenario.glyph.repeat(scenario.count) + scenario.suffix)}, state: 'loading', children: [] });
					renderer.flushRender(true);
					const live = output;
					output = '';
					tasks.length = 0;
					renderer.flushRender(true);
					renderer.destroy();
					process.stdout.write(JSON.stringify({ live, cleanup: output }));
				`,
			}, { tempDir });
			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');
			const { live, cleanup } = JSON.parse(result.stdout) as {
				live: string;
				cleanup: string;
			};
			const taskLine = stripAnsi(live).split('\n')[1];
			expect(taskLine).toBe(`⠋ ${stripAnsi(scenario.glyph).repeat(Math.min(scenario.count, 29))}`);
			using terminal = createTerminal({
				cols: 20,
				rows: 5,
			});
			terminal.terminal.loadAddon(new unicodeGraphemes.UnicodeGraphemesAddon());
			await terminal.write(live.replaceAll('\n', '\r\n'));
			expect(terminal.terminal.buffer.active.baseY).toBe(0);
			expect(terminal.screen.split('\n')).toHaveLength(scenario.suffix ? 4 : 1 + Math.ceil((2 + 2 * Math.min(scenario.count, 29)) / 20));
			await terminal.write(cleanup.replaceAll('\n', '\r\n'));
			expect(terminal.screen).toBe('KEEP');
		});
	}

	for (const link of [
		{
			name: 'BEL wrapped title',
			terminator: '\u0007',
			text: 'x'.repeat(100),
		},
		{
			name: 'ST wrapped title',
			terminator: '\u001B\\',
			text: 'x'.repeat(100),
		},
		{
			name: 'ST multiline title',
			terminator: '\u001B\\',
			text: 'linked line\n'.repeat(10),
		},
	]) {
		test(`clipping closes hyperlinks: ${link.name}`, async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
					const dimensions = { columns: 20, rows: 5 };
					${pinnedSetup}
					const link = ${JSON.stringify(link)};
					tasks.push({ title: '\x1b]8;;https://example.com/task' + link.terminator + '\x1b[31m' + link.text + '\x1b[39m\x1b]8;;' + link.terminator, state: 'loading', children: [] });
					renderer.flushRender(true);
					tasks.length = 0;
					renderer.flushRender(true);
					renderer.destroy();
					stream.write('COMPLETED\n');
					process.stdout.write(output);
				`,
			}, { tempDir });
			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');
			using terminal = createTerminal({
				cols: 20,
				rows: 5,
			});
			const links: string[] = [];
			const handler = terminal.terminal.parser.registerOscHandler(8, (data) => {
				links.push(data);
				return false;
			});
			try {
				await terminal.write(result.stdout.replaceAll('\n', '\r\n'));
				expect(links).toContain(';https://example.com/task');
				expect(links.at(-1)).toBe(';');
				expect(terminal.screen).toBe('COMPLETED');
				expect(terminal.terminal.buffer.active.getLine(0)!.getCell(0)!.isFgDefault()).toBe(true);
			} finally {
				handler.dispose();
			}
		});
	}

	test('wrapped concurrent tasks leave no loading rows after removal', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
				const dimensions = { columns: 30, rows: 24 };
				${pinnedSetup}
				for (let index = 0; index < 16; index += 1) {
					tasks.push({
						title: 'evals/pr/long-evaluation-case-' + index + '.eval.ts',
						status: '$0.012', state: 'loading', children: [],
					});
					renderer.flushRender(true);
				}
				for (let index = 0; index < 16; index += 1) {
					tasks.shift();
					renderer.flushRender(true);
					stream.write('[passed] CASE-' + index + '\n');
				}
				renderer.destroy();
				process.stdout.write(output);
			`,
		}, { tempDir });
		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stderr).toBe('');
		using terminal = createTerminal({
			cols: 30,
			rows: 24,
		});
		await terminal.write(result.stdout.replaceAll('\n', '\r\n'));
		expect(terminal.screen).toBe(completedResults);
	});

	for (const scenario of [
		{
			name: 'exact-width titles',
			task: { title: 'x'.repeat(28) },
		},
		{
			name: 'oversized title',
			task: { title: 'x'.repeat(500) },
		},
		{
			name: 'oversized nested output',
			task: {
				title: 'Parent',
				children: [{
					title: 'Child',
					state: 'loading',
					children: [],
					output: 'output\n'.repeat(30),
				}],
			},
		},
		{
			name: 'wrapped mixed-state summary',
			dimensions: {
				columns: 20,
				rows: 6,
			},
			task: { title: 'Task' },
			states: ['loading', 'pending', 'success'],
		},
		{
			name: 'maxVisible beyond viewport',
			task: { title: 'Task' },
			maxVisible: 100,
		},
		{
			name: 'fractional maxVisible',
			dimensions: { rows: 25 },
			task: { title: 'x'.repeat(1000) },
			maxVisibleRatio: 0.5,
		},
		{
			name: 'tiny viewport',
			dimensions: {
				columns: 20,
				rows: 3,
			},
			task: { title: 'Task' },
		},
		{
			name: 'styled wide titles',
			dimensions: { columns: 21 },
			task: { title: ansis.red('界'.repeat(80)) },
		},
	]) {
		test(`${scenario.name} leave no loading rows after removal`, async () => {
			const dimensions = {
				columns: 30,
				rows: 8,
				...scenario.dimensions,
			};
			await using fixture = await createFixture({
				'test.mjs': String.raw`
					const dimensions = ${JSON.stringify(dimensions)};
					${pinnedSetup}
					const scenario = ${JSON.stringify(scenario)};
					const states = scenario.states ?? ['loading'];
					renderer.setMaxVisible(scenario.maxVisibleRatio === undefined
						? scenario.maxVisible
						: height => height * scenario.maxVisibleRatio);
					for (let index = 0; index < 16; index += 1) {
						tasks.push({ state: states[index % states.length], children: [], ...scenario.task });
						renderer.flushRender(true);
					}
					for (let index = 0; index < 16; index += 1) {
						tasks.shift();
						renderer.flushRender(true);
						stream.write('[passed] CASE-' + index + '\n');
					}
					renderer.destroy();
					process.stdout.write(output);
				`,
			}, { tempDir });
			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stderr).toBe('');
			using terminal = createTerminal({
				cols: dimensions.columns,
				rows: dimensions.rows,
			});
			await terminal.write(result.stdout.replaceAll('\n', '\r\n'));
			expect(terminal.screen).toBe(completedResults);
		});
	}

	test('resize clips a task to the updated viewport budget', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
				const dimensions = { columns: 80, rows: 24 };
				${pinnedSetup}
				stream.write('KEEP\n');
				tasks.push({ title: 'Before resize', state: 'loading', children: [] });
				renderer.flushRender(true);
				const beforeResize = output;
				output = '';
				Object.assign(stream, { columns: 30, rows: 8 });
				stream.emit('resize');
				tasks[0].title = 'x'.repeat(500);
				renderer.flushRender(true);
				const afterResize = output;
				output = '';
				tasks.length = 0;
				renderer.flushRender(true);
				renderer.destroy();
				process.stdout.write(JSON.stringify({ beforeResize, afterResize, cleanup: output }));
			`,
		}, { tempDir });
		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stderr).toBe('');
		const { beforeResize, afterResize, cleanup } = JSON.parse(result.stdout) as {
			beforeResize: string;
			afterResize: string;
			cleanup: string;
		};
		using terminal = createTerminal({
			cols: 80,
			rows: 24,
		});
		await terminal.write(beforeResize.replaceAll('\n', '\r\n'));
		terminal.terminal.resize(30, 8);
		await terminal.write(afterResize.replaceAll('\n', '\r\n'));
		expect(terminal.terminal.buffer.active.baseY).toBe(0);
		expect(terminal.screen).toBe(`KEEP\n⠋ ${'x'.repeat(28)}${`\n${'x'.repeat(30)}`.repeat(5)}`);
		await terminal.write(cleanup.replaceAll('\n', '\r\n'));
		expect(terminal.screen).toBe('KEEP');
	});

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

		const grid = result.screen.split('\n');
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
