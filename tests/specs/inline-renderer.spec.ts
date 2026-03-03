import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansis from 'ansis';
import stripAnsi from 'strip-ansi';
import { node } from '../utils/node.ts';
import { nodePty, waitFor } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';

describe('inline renderer', () => {
	describe('task states', () => {
		test('success state shows green checkmark', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Install deps', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.green('✔'));
			expect(result.stderr).toContain('Install deps');
		});

		test('error state shows red X with message', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Error task', async ({ setError }) => {
					setError('Something went wrong');
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.red('✖'));
			expect(result.stderr).toContain('Error task');
			expect(result.stderr).toContain(ansis.red('Something went wrong'));
		});

		test('warning state shows yellow warning with message', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Warning task', async ({ setWarning }) => {
					setWarning('Caution');
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.yellow('⚠'));
			expect(result.stderr).toContain('Warning task');
			expect(result.stderr).toContain(ansis.yellow('Caution'));
		});

		// Regression: setOutput must run before state change in setError/setWarning.
		// The inline renderer commits tasks on terminal state change (one-shot via
		// WeakSet). If state changes first, the task is committed without its output.
		test('setError output is not lost to state-change race', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Task A', async ({ setError }) => {
					setError('error output must appear');
				});
				await task('Task B', async ({ setError }) => {
					setError(new Error('error object must appear'));
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.red('error output must appear'));
			expect(result.stderr).toContain(ansis.red('error object must appear'));
		});

		test('setWarning output is not lost to state-change race', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Task', async ({ setWarning }) => {
					setWarning('warning output must appear');
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.yellow('warning output must appear'));
		});

		test('setTitle updates task title', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Original title', async ({ setTitle }) => {
					setTitle('Updated title');
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('Updated title');
		});

		test('setStatus shows status in brackets', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Task', async ({ setStatus }) => {
					setStatus('50%');
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('[50%]');
		});

		test('setOutput shows output below task on completion', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Task with output', async ({ setOutput }) => {
					setOutput('Some output');
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.gray('Some output'));
		});

		test('task function throws error', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				try {
					await task('Throwing task', async () => {
						throw new Error('boom');
					});
				} catch {}
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			expect(result.stderr).toContain(ansis.red('✖'));
			expect(result.stderr).toContain('Throwing task');
		});
	});

	describe('console ordering (issue #16)', () => {
		test('console.log after task appears below task', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('My task', async () => {});
				console.log('should print after task');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// stdout should contain the console.log
			expect(result.stdout).toBe('should print after task');

			// stderr should contain the task
			expect(result.stderr).toContain(ansis.green('✔'));
			expect(result.stderr).toContain('My task');
		});

		test('console.log between tasks appears in order', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				console.log('Before any tasks');

				await task('First task', async () => {});
				console.log('Between tasks');

				await task('Second task', async () => {});
				console.log('After all tasks');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(result.stdout).toBe(
				'Before any tasks\n'
				+ 'Between tasks\n'
				+ 'After all tasks',
			);

			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('✔ First task');
			expect(plain).toContain('✔ Second task');
		});

		test('console.log inside task does not get reordered', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Task A', async () => {
					console.log('inside A');
				});
				console.log('after A');

				await task('Task B', async () => {
					console.log('inside B');
				});
				console.log('after B');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(result.stdout).toBe(
				'inside A\n'
				+ 'after A\n'
				+ 'inside B\n'
				+ 'after B',
			);
		});

		test('console.log during active spinner does not corrupt output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task('Slow task', async () => {
					await setTimeout(200);
					console.log('mid-task log');
					await setTimeout(200);
				});
				`,
			}, { tempDir });

			// Must use PTY — spinner only runs when isTTY=true
			const result = await nodePty(fixture.getPath('test.mjs'));

			// In PTY output, \r overwrites from column 0. Simulate terminal:
			// split each line by \r and take the last non-empty segment to get
			// the visually rendered content.
			const visualLines = stripAnsi(result.output)
				.split('\n')
				.map((line) => {
					const segments = line.split('\r');
					// Last non-empty segment is what the terminal visually shows
					for (let i = segments.length - 1; i >= 0; i -= 1) {
						if (segments[i].trim()) {
							return segments[i].trim();
						}
					}
					return '';
				})
				.filter(Boolean);

			// "mid-task log" must appear as its own visual line, not appended
			// to a spinner line (e.g. "⠧ Slow taskmid-task log")
			const logLine = visualLines.find(line => line.includes('mid-task log'));
			expect(logLine).toBe('mid-task log');
		}, { retry: 3 });
	});

	describe('nested tasks', () => {
		test('nested tasks render with indentation', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Parent', async () => {
					await task('Child A', async () => {});
					await task('Child B', async () => {});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
			// Parent uses parent icon (❯)
			expect(plain).toContain('❯ Parent');
			// Children are indented
			expect(plain).toContain('  ✔ Child A');
			expect(plain).toContain('  ✔ Child B');
		});

		test('child task appears after parent, not after sibling tasks', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task.group(t => [
					t('Parent', async () => {
						await setTimeout(200);
						await task('Child', async () => {
							await setTimeout(200);
						});
					}),
					t('Sibling', async () => { await setTimeout(800); }),
				], { concurrency: 2 });
				`,
			}, { tempDir });

			const subprocess = nodePty(fixture.getPath('test.mjs'));
			await waitFor(subprocess, output => stripAnsi(output).includes('Child'));

			const result = await subprocess;
			const plain = stripAnsi(result.output);

			expect(plain).toContain('Parent');
			expect(plain).toContain('Child');
			expect(plain).toContain('Sibling');

			// Child was inserted via CSI L (Insert Line), not appended at cursor rest
			// eslint-disable-next-line no-control-regex
			expect(result.output).toMatch(/\u001B\[1?L[^\n]*Child/);

			// Verify visual ordering via in-place update offsets.
			// Each update: CSI {n}A \r CSI 2K {content} CSI {n}B \r
			// Higher offset = further from cursor rest = higher on screen.
			// eslint-disable-next-line no-control-regex
			const updatePattern = /\u001B\[(\d+)A\r\u001B\[2K(.*?)\u001B\[\d+B\r/g;
			const updates = [...result.output.matchAll(updatePattern)];

			const findLastOffset = (taskName: string) => {
				for (let i = updates.length - 1; i >= 0; i -= 1) {
					if (stripAnsi(updates[i][2]).includes(taskName)) {
						return Number(updates[i][1]);
					}
				}
				return -1;
			};

			const parentOffset = findLastOffset('Parent');
			const childOffset = findLastOffset('Child');
			const siblingOffset = findLastOffset('Sibling');

			expect(parentOffset).toBeGreaterThan(0);
			expect(childOffset).toBeGreaterThan(0);
			expect(siblingOffset).toBeGreaterThan(0);

			// Correct visual order: Parent (top), Child (middle), Sibling (bottom)
			expect(parentOffset).toBeGreaterThan(childOffset);
			expect(childOffset).toBeGreaterThan(siblingOffset);
		}, { retry: 3 });
	});

	describe('task.group', () => {
		test('group tasks render and complete', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				const results = await task.group(task => [
					task('Task A', async () => 'a'),
					task('Task B', async () => 'b'),
					task('Task C', async () => 'c'),
				]);
				console.log(results.join(','));
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(result.stdout).toBe('a,b,c');

			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('✔ Task A');
			expect(plain).toContain('✔ Task B');
			expect(plain).toContain('✔ Task C');
		});

		test('concurrent group tasks complete correctly', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task.group(task => [
					task('Fast', async () => { await setTimeout(50); }),
					task('Medium', async () => { await setTimeout(100); }),
					task('Slow', async () => { await setTimeout(150); }),
				], { concurrency: 3 });

				console.log('all done');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			expect(result.stdout).toBe('all done');

			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('✔ Fast');
			expect(plain).toContain('✔ Medium');
			expect(plain).toContain('✔ Slow');
		});
	});

	describe('non-TTY / piped output', () => {
		test('non-TTY output has no ANSI cursor sequences', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Piped task', async () => {});
				`,
			}, { tempDir });

			// node() runs without a PTY, so output is non-TTY
			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Should not contain carriage return or cursor movement sequences
			expect(result.stderr).not.toContain('\r');
			expect(result.stderr).not.toContain('\u001B[K');
			expect(result.stderr).not.toContain('\u001B[A');
			expect(result.stderr).not.toContain('\u001B[B');

			// Should still contain the task output
			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('✔ Piped task');
		});
	});

	describe('no cursor save/restore', () => {
		test('inline renderer does not use cursor save/restore', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Simple task', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Should not contain cursor save/restore sequences (pinned uses these)
			expect(result.stderr).not.toContain('\u001B7'); // ESC 7 save
			expect(result.stderr).not.toContain('\u001B8'); // ESC 8 restore
		});
	});

	describe('elapsed time', () => {
		test('showTime option displays elapsed time', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task('Timed task', async () => {
					await setTimeout(1100);
				}, { showTime: true });
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
			expect(plain).toMatch(/Timed task.*\(1s\)/);
		});
	});

	describe('clear', () => {
		test('clear removes task from list but does not erase output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				const t = task('Clearable task', async () => {});
				await t;
				t.clear();
				console.log('after clear');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));

			// Task output should still be in stderr (it's in scrollback)
			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('✔ Clearable task');

			// Console output appears after
			expect(result.stdout).toBe('after clear');
		});
	});

	describe('stream preview', () => {
		test('streamPreview output shown on completion', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Preview task', async ({ streamPreview }) => {
					streamPreview.write('line 1\n');
					streamPreview.write('line 2\n');
					streamPreview.end();
					await new Promise(resolve => streamPreview.on('finish', resolve));
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('✔ Preview task');
			expect(plain).toContain('line 1');
			expect(plain).toContain('line 2');
		});
	});

	describe('fire-and-forget interleaving', () => {
		test('console.log(i) + task(i) produces interleaved output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				for (let i = 0; i < 3; i++) {
					console.log(i);
					task('Task ' + i, async () => {
						await setTimeout(50);
					});
				}

				// Wait for all tasks to complete
				await setTimeout(300);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));

			// Simulate terminal: process the raw ANSI output to get final visual state
			const visualLines = stripAnsi(result.output)
				.split('\n')
				.map((line) => {
					const segments = line.split('\r');
					for (let i = segments.length - 1; i >= 0; i -= 1) {
						if (segments[i].trim()) {
							return segments[i].trim();
						}
					}
					return '';
				})
				.filter(Boolean);

			// Verify interleaved output: each number should appear directly before its task
			// Expected: 0, ✔ Task 0, 1, ✔ Task 1, 2, ✔ Task 2
			const taskPattern = visualLines.filter(
				line => /^\d$/.test(line) || line.includes('Task'),
			);

			// Numbers and tasks should alternate
			expect(taskPattern.length >= 6).toBe(true);

			// Each number should appear BEFORE its corresponding task
			const indexOf0 = taskPattern.indexOf('0');
			const indexOfTask0 = taskPattern.findIndex(line => line.includes('Task 0'));
			expect(indexOf0).toBeLessThan(indexOfTask0);

			const indexOf1 = taskPattern.indexOf('1');
			const indexOfTask1 = taskPattern.findIndex(line => line.includes('Task 1'));
			expect(indexOf1).toBeLessThan(indexOfTask1);

			const indexOf2 = taskPattern.indexOf('2');
			const indexOfTask2 = taskPattern.findIndex(line => line.includes('Task 2'));
			expect(indexOf2).toBeLessThan(indexOfTask2);

			// Key: tasks should be interleaved with numbers, not grouped at the bottom
			// 0 should be immediately followed by Task 0 (adjacent)
			expect(indexOfTask0 - indexOf0).toBe(1);
			expect(indexOfTask1 - indexOf1).toBe(1);
			expect(indexOfTask2 - indexOf2).toBe(1);
		}, { retry: 3 });
	});

	describe('scrollback safety', () => {
		test('cursor-up never exceeds terminal rows', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				// Create more tasks than terminal rows (rows=5)
				for (let i = 0; i < 8; i += 1) {
					task('Task ' + i, async () => { await setTimeout(200); });
				}
				await setTimeout(500);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'), { rows: 5 });

			// Parse all CSI n A (cursor up) sequences and verify none exceed rows - 1
			const maxAllowed = 4; // rows(5) - 1
			// eslint-disable-next-line no-control-regex
			const cursorUpMatches = [...result.output.matchAll(/\u001B\[(\d+)A/g)];
			for (const match of cursorUpMatches) {
				const distance = Number(match[1]);
				expect(distance <= maxAllowed).toBe(true);
			}

			// Verify tasks within viewport completed successfully
			const plain = stripAnsi(result.output);
			expect(plain).toContain('Task');
		}, { retry: 3 });
	});

	describe('state revert', () => {
		test('setError(false) reverts task to loading then completes as success', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task('Recoverable', async ({ setError }) => {
					setError('temporary failure');
					await setTimeout(200);
					setError(false);
					await setTimeout(200);
				});
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			const plain = stripAnsi(result.output);

			// Error icon appeared during error phase (in-place update via cursor-up)
			expect(plain).toContain('✖');

			// Success icon appeared as final state (in-place update via cursor-up)
			expect(plain).toContain('✔');

			// Spinner frames appeared after the error was reverted (proves loading resumed)
			const errorIndex = plain.indexOf('✖');
			const lastSpinnerIndex = plain.lastIndexOf('⠋');
			expect(lastSpinnerIndex > errorIndex).toBe(true);
		}, { retry: 3 });

		test('setWarning(false) reverts task to loading then completes as success', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task('Recoverable', async ({ setWarning }) => {
					setWarning('temporary issue');
					await setTimeout(200);
					setWarning(false);
					await setTimeout(200);
				});
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			const plain = stripAnsi(result.output);

			// Warning icon appeared during warning phase
			expect(plain).toContain('⚠');

			// Success icon appeared as final state
			expect(plain).toContain('✔');

			// Spinner frames appeared after the warning was reverted
			const warningIndex = plain.indexOf('⚠');
			const lastSpinnerIndex = plain.lastIndexOf('⠋');
			expect(lastSpinnerIndex > warningIndex).toBe(true);
		}, { retry: 3 });
	});

	describe('CI mode', () => {
		test('CI=1 produces append-only output with no cursor sequences', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task('First', async () => { await setTimeout(50); });
				await task('Second', async ({ setOutput }) => {
					setOutput('some output');
					await setTimeout(50);
				});
				await task('Parent', async () => {
					await task('Child', async () => { await setTimeout(50); });
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'), {
				CI: '1',
				FORCE_COLOR: '1',
			});
			expect(result.stdout).toBe('');

			// No cursor movement sequences
			expect(result.stderr).not.toContain('\u001B[A');
			expect(result.stderr).not.toContain('\u001B[B');
			expect(result.stderr).not.toContain('\u001B[K');
			expect(result.stderr).not.toContain('\r');

			const plain = stripAnsi(result.stderr);

			// Tasks in order
			const firstIndex = plain.indexOf('✔ First');
			const secondIndex = plain.indexOf('✔ Second');
			const parentIndex = plain.indexOf('❯ Parent');
			const childIndex = plain.indexOf('✔ Child');
			expect(firstIndex).toBeLessThan(secondIndex);
			expect(secondIndex).toBeLessThan(parentIndex);
			expect(parentIndex).toBeLessThan(childIndex);

			// setOutput content appears
			expect(result.stderr).toContain(ansis.gray('some output'));

			// Nested indentation
			expect(plain).toContain('  ✔ Child');
		});
	});

	describe('non-TTY output content', () => {
		test('setOutput and streamPreview appear in piped output', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({ renderer: inline, theme });

				await task('Single output', async ({ setOutput }) => {
					setOutput('Build: 3 files');
				});

				await task('Multi output', async ({ setOutput }) => {
					setOutput('line A\nline B\nline C');
				});

				await task('Stream task', async ({ streamPreview }) => {
					streamPreview.write('stream 1\nstream 2\n');
					streamPreview.end();
					await new Promise(resolve => streamPreview.on('finish', resolve));
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Single-line output with → prefix
			expect(result.stderr).toContain(ansis.gray('Build: 3 files'));

			// Multi-line output: first line gets → prefix, continuation lines align
			expect(result.stderr).toContain(ansis.gray('line A'));
			expect(result.stderr).toContain(ansis.gray('line B'));
			expect(result.stderr).toContain(ansis.gray('line C'));

			// Stream output: first line gets ⎿ prefix
			expect(result.stderr).toContain(ansis.gray('stream 1'));
			expect(result.stderr).toContain(ansis.gray('stream 2'));

			// No cursor sequences in piped output
			expect(result.stderr).not.toContain('\u001B[A');
			expect(result.stderr).not.toContain('\u001B[B');
		});
	});

	describe('console offset tracking', () => {
		test('multi-newline console.log does not corrupt task updates', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task('Before', async () => { await setTimeout(50); });

				console.log('multi\nline\noutput');

				await task('After', async () => { await setTimeout(200); });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			const plain = stripAnsi(result.output);

			// Both tasks completed successfully (checkmarks written via cursor-up)
			expect(plain).toContain('✔');
			expect(plain).toContain('Before');
			expect(plain).toContain('After');

			// Multi-line console output present
			expect(plain).toContain('multi');
			expect(plain).toContain('line');
			expect(plain).toContain('output');

			// "After" task line appears after console output in the raw stream
			// (proves offsets were incremented correctly for the 3 newlines)
			const consoleOutputIndex = plain.indexOf('output');
			const afterTaskIndex = plain.lastIndexOf('After');
			expect(consoleOutputIndex).toBeLessThan(afterTaskIndex);
		}, { retry: 3 });
	});

	describe('maxVisible', () => {
		test('defers tasks beyond maxVisible limit', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task.group(task => [
					task('Task 1', async () => { await setTimeout(2000); }),
					task('Task 2', async () => { await setTimeout(2000); }),
					task('Task 3', async () => { await setTimeout(2000); }),
					task('Task 4', async () => { await setTimeout(2000); }),
					task('Task 5', async () => { await setTimeout(2000); }),
				], { concurrency: 5, maxVisible: 2 });

				process.stderr.write('ALL_DONE\n');
				`,
			}, { tempDir });

			const subprocess = nodePty(fixture.getPath('test.mjs'));

			// Wait for both visible slots to fill
			await waitFor(subprocess, output => output.includes('Task 2'));

			// Snapshot: Task 3 should NOT be visible yet (maxVisible=2 gate)
			const snapshot = stripAnsi(subprocess.output);
			expect(snapshot).not.toContain('Task 3');

			// Wait for completion
			const result = await subprocess;

			// All 5 tasks should eventually complete
			const plain = stripAnsi(result.output);
			expect(plain).toContain('Task 1');
			expect(plain).toContain('Task 5');
			expect(plain).toContain('ALL_DONE');
		}, { retry: 3 });

		test('deferred tasks appear after earlier tasks complete', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				import { setTimeout } from 'node:timers/promises';
				const task = createTasuku({ renderer: inline, theme });

				await task.group(task => [
					task('Fast A', async () => { await setTimeout(200); }),
					task('Fast B', async () => { await setTimeout(200); }),
					task('Slow C', async () => { await setTimeout(800); }),
				], { concurrency: 3, maxVisible: 2 });
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			const plain = stripAnsi(result.output);

			// All 3 tasks should complete
			expect(plain).toContain('Fast A');
			expect(plain).toContain('Fast B');
			expect(plain).toContain('Slow C');

			// Slow C should appear AFTER Fast A/B in the output stream
			// (it was deferred because maxVisible=2 was already full)
			const firstFast = Math.min(
				plain.indexOf('Fast A'),
				plain.indexOf('Fast B'),
			);
			const slowIndex = plain.indexOf('Slow C');
			expect(slowIndex).toBeGreaterThan(firstFast);
		}, { retry: 3 });
	});

	describe('multiple instances', () => {
		test('concurrent inline renderers do not corrupt each other\'s rows', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';

				const theme2 = { ...theme, icons: { ...theme.icons, success: '✓' } };
				const theme3 = { ...theme, icons: { ...theme.icons, success: '●' } };

				const task1 = createTasuku({ renderer: inline, theme });
				const task2 = createTasuku({ renderer: inline, theme: theme2 });
				const task3 = createTasuku({ renderer: inline, theme: theme3 });

				task1('Task A', async () => { await setTimeout(100); });
				task2('Task B', async () => { await setTimeout(100); });
				task3('Task C', async () => { await setTimeout(100); });

				await setTimeout(500);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);

			// Parse the raw ANSI output through a virtual terminal to check
			// that no task title ends up on a row belonging to another task
			const { checkRowOwnership } = await import('../utils/ansi-terminal.ts');
			const check = checkRowOwnership(result.output, ['Task A', 'Task B', 'Task C']);
			expect(check.violation).toBeUndefined();

			// Verify all tasks completed with their unique success icons
			const plain = stripAnsi(result.output);
			expect(plain).toContain('Task A');
			expect(plain).toContain('Task B');
			expect(plain).toContain('Task C');
		}, { retry: 3 });

		test('console.error during concurrent rendering does not corrupt offsets', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';

				const task1 = createTasuku({ renderer: inline, theme });
				const task2 = createTasuku({ renderer: inline, theme });

				task1('Task A', async () => {
					await setTimeout(50);
					console.error('stderr output');
					await setTimeout(100);
				});
				task2('Task B', async () => { await setTimeout(200); });

				await setTimeout(400);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);

			const { checkRowOwnership } = await import('../utils/ansi-terminal.ts');
			const check = checkRowOwnership(result.output, ['Task A', 'Task B']);
			expect(check.violation).toBeUndefined();
		}, { retry: 3 });

		test('concurrent task.group() across multiple instances', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';

				const task1 = createTasuku({ renderer: inline, theme });
				const task2 = createTasuku({ renderer: inline, theme });

				const group1 = task1.group(task => [
					task('Group1 A', async () => { await setTimeout(50); }),
					task('Group1 B', async () => { await setTimeout(80); }),
				], { concurrency: 2 });

				const group2 = task2.group(task => [
					task('Group2 X', async () => { await setTimeout(60); }),
					task('Group2 Y', async () => { await setTimeout(70); }),
				], { concurrency: 2 });

				await Promise.all([group1, group2]);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);

			const { checkRowOwnership } = await import('../utils/ansi-terminal.ts');
			const check = checkRowOwnership(
				result.output,
				['Group1 A', 'Group1 B', 'Group2 X', 'Group2 Y'],
			);
			expect(check.violation).toBeUndefined();

			const plain = stripAnsi(result.output);
			expect(plain).toContain('Group1 A');
			expect(plain).toContain('Group1 B');
			expect(plain).toContain('Group2 X');
			expect(plain).toContain('Group2 Y');
		}, { retry: 3 });

		test('direct stderr.write during single-instance rendering does not corrupt offsets', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';

				const task = createTasuku({ renderer: inline, theme });

				task('Task A', async () => {
					await setTimeout(50);
					process.stderr.write('DIRECT_WRITE\n');
					await setTimeout(100);
				});

				task('Task B', async () => { await setTimeout(200); });

				await setTimeout(400);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);

			const { checkRowOwnership } = await import('../utils/ansi-terminal.ts');
			const check = checkRowOwnership(result.output, ['Task A', 'Task B']);
			expect(check.violation).toBeUndefined();
		}, { retry: 3 });
	});

	describe('cross-stream console interleaving', () => {
		test('console.log during inline rendering does not lose task output', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';

				const task = createTasuku({ renderer: inline, theme });

				task('Task A', async () => {
					for (let i = 0; i < 5; i++) {
						console.log('log ' + i);
						await setTimeout(20);
					}
				});

				task('Task B', async () => { await setTimeout(200); });

				await setTimeout(400);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);

			// Both tasks should complete successfully — console.log output
			// should not cause task lines to be lost or corrupted
			const plain = stripAnsi(result.output);
			expect(plain).toContain('Task A');
			expect(plain).toContain('Task B');
		}, { retry: 3 });

		test('console.log with stdout redirected does not inflate stderr offsets', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import fs from 'node:fs';
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';

				// Redirect stdout to a file — stderr stays on the terminal.
				// This makes process.stdout.isTTY become false.
				const devNull = fs.openSync('/dev/null', 'w');
				const origWrite = process.stdout.write.bind(process.stdout);
				Object.defineProperty(process.stdout, 'isTTY', { value: false });
				process.stdout.write = (chunk, ...args) => {
					fs.writeSync(devNull, typeof chunk === 'string' ? chunk : chunk.toString());
					return true;
				};

				const task = createTasuku({ renderer: inline, theme });

				task('Task A', async () => {
					for (let i = 0; i < 10; i++) {
						console.log('redirected ' + i);
						await setTimeout(10);
					}
				});

				task('Task B', async () => { await setTimeout(200); });

				await setTimeout(400);
				fs.closeSync(devNull);
				`,
			}, { tempDir });

			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);

			// With stdout redirected (not TTY), console.log should NOT affect
			// stderr cursor offsets. Cursor-up should stay <= task count (2).
			// eslint-disable-next-line no-control-regex -- matching ANSI cursor-up
			const cursorUpValues = [...result.output.matchAll(/\u001B\[(\d+)A/g)]
				.map(match => Number(match[1]));

			for (const value of cursorUpValues) {
				expect(value).toBeLessThanOrEqual(2);
			}

			// Tasks should still complete correctly
			const plain = stripAnsi(result.output);
			expect(plain).toContain('Task A');
			expect(plain).toContain('Task B');
		}, { retry: 3 });
	});

	describe('custom theme', () => {
		test('works with createTasuku custom theme', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				import { theme } from '#tasuku';
				const task = createTasuku({
					renderer: inline,
					theme: {
						...theme,
						icons: { ...theme.icons, success: '✓' },
					},
				});

				await task('Custom icon', async () => {});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			const plain = stripAnsi(result.stderr);
			expect(plain).toContain('✓ Custom icon');
			expect(plain).not.toContain('✔');
		});
	});
});
