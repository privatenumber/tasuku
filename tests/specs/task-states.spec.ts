import {
	describe, test, expect, onTestFail,
} from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { nodePty } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';
import { hasSpinner } from '../utils/spinner-frames.ts';

describe('task states', () => {
	test('error state shows red X with gray message', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Error task', async ({ setError }) => {
					setError('Something went wrong');
				});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('Error task');
		expect(result.stderr).toContain(ansis.red('✖'));
		expect(result.stderr).toContain(ansis.gray('→ Something went wrong'));
	});

	test('warning state shows yellow warning with gray message', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Warning task', async ({ setWarning }) => {
					setWarning('Warning message');
				});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('Warning task');
		expect(result.stderr).toContain(ansis.yellow('⚠'));
		expect(result.stderr).toContain(ansis.gray('→ Warning message'));
	});

	test('pending state shows square symbol', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task => [
					task('one', async () => { await setTimeout(50); }),
					task('two', async () => { await setTimeout(50); }),
				], { concurrency: 1 });
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('one');
		expect(result.stderr).toContain('two');
		expect(result.stderr).toContain(ansis.green('✔'));
		expect(result.stderr).toContain(ansis.gray('◼'));
	});

	test('status displays in brackets with dim styling', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';

			await task('My task', async ({ setStatus }) => {
				setStatus('loading');
			});
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('My task');
		expect(result.stderr).toContain(ansis.dim('[loading]'));
	});

	test('status can be updated and cleared', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('Task', async ({ setStatus }) => {
				setStatus('step 1');
				await setTimeout(50);
				setStatus('step 2');
				await setTimeout(50);
				setStatus(undefined);
				await setTimeout(50);
			});
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain(ansis.dim('[step 1]'));
		expect(result.stderr).toContain(ansis.dim('[step 2]'));

		// Final output has no status brackets after clearing
		const lines = result.stderr.split('\n');
		const finalTaskLine = lines.reverse().find(line => line.includes('✔') && line.includes('Task'));
		expect(finalTaskLine).toBeTruthy();
		expect(finalTaskLine).not.toMatch(/\[step/);
	});

	test('task with multi-line output indents each line', async () => {
		await using fixture = await createFixture({
			'test.mjs': String.raw`
			import task from '#tasuku';

			await task('Task with multi-line output', async ({ setOutput }) => {
				setOutput('line 1\nline 2\nline 3');
			});
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain(`\n  ${ansis.gray('→ line 1')}`);
		expect(result.stderr).toContain(`\n  ${ansis.gray('line 2')}`);
		expect(result.stderr).toContain(`\n  ${ansis.gray('line 3')}`);
	});

	test('setTitle updates task title dynamically', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Initial title', async ({ setTitle }) => {
					await setTimeout(50);
					setTitle('Updated title');
					await setTimeout(50);
				});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('Initial title');
		expect(result.stderr).toContain('Updated title');

		const initialIndex = result.stderr.indexOf('Initial title');
		const updatedIndex = result.stderr.indexOf('Updated title');
		expect(initialIndex).toBeLessThan(updatedIndex);

		expect(result.stderr).toContain(ansis.yellow('⠋'));

		const finalSuccessLine = `${ansis.green('✔')} Updated title`;
		expect(result.stderr).toContain(finalSuccessLine);

		const initialSuccessLine = `${ansis.green('✔')} Initial title`;
		expect(result.stderr).not.toContain(initialSuccessLine);
	});

	test('setError with Error object', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';

				await task('Task', async ({ setError }) => {
					setError(new Error('Error object message'));
				});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('Error object message');
		expect(result.stderr).toContain(ansis.red('✖'));
		expect(result.stderr).toContain(ansis.gray('→ Error object message'));
	});

	test('task function throws error', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';

				try {
					await task('Task', async () => {
						throw new Error('Task failed');
					});
				} catch (error) {
					console.log('Caught:', error.message);
				}
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toContain('Caught: Task failed');
		expect(result.stderr).toContain(ansis.red('✖'));
		expect(result.stderr).toContain(ansis.gray('→ Task failed'));
	});

	test('clear method removes single task', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task to clear', async () => {
					await setTimeout(50);
				}).clear();

				console.log('AFTER_CLEAR');
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toContain('AFTER_CLEAR');
		expect(result.stderr).toContain(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
	});

	test('setError() with no arg reverts to loading state', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Retry task', async ({ setError }) => {
					setError('temporary failure');
					await setTimeout(100);
					setError();
					await setTimeout(100);
				});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'));
		onTestFail(() => { console.log(result); });
		expect(result.exitCode).toBe(0);

		expect(result.output).toContain(ansis.red('✖'));
		expect(result.output).toContain('Retry task');

		// Spinner after error icon proves recovery to loading state
		const errorIndex = result.output.indexOf(ansis.red('✖'));
		const afterError = result.output.slice(errorIndex);
		expect(hasSpinner(afterError)).toBe(true);
	}, { retry: 3 });

	test('setError(false) reverts to loading state', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Retry task', async ({ setError }) => {
					setError('temporary failure');
					await setTimeout(100);
					setError(false);
					await setTimeout(100);
				});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'));
		onTestFail(() => { console.log(result); });
		expect(result.exitCode).toBe(0);

		expect(result.output).toContain(ansis.red('✖'));

		const errorIndex = result.output.indexOf(ansis.red('✖'));
		const afterError = result.output.slice(errorIndex);
		expect(hasSpinner(afterError)).toBe(true);
	}, { retry: 3 });

	test('setError(null) reverts to loading state', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Retry task', async ({ setError }) => {
					setError('temporary failure');
					await setTimeout(100);
					setError(null);
					await setTimeout(100);
				});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'));
		onTestFail(() => { console.log(result); });
		expect(result.exitCode).toBe(0);

		expect(result.output).toContain(ansis.red('✖'));

		const errorIndex = result.output.indexOf(ansis.red('✖'));
		const afterError = result.output.slice(errorIndex);
		expect(hasSpinner(afterError)).toBe(true);
	}, { retry: 3 });

	test('setWarning() with no arg reverts to loading state', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Warn task', async ({ setWarning }) => {
					setWarning('temporary warning');
					await setTimeout(100);
					setWarning();
					await setTimeout(100);
				});
			`,
		}, { tempDir });

		const result = await nodePty(fixture.getPath('test.mjs'));
		onTestFail(() => { console.log(result); });
		expect(result.exitCode).toBe(0);

		expect(result.output).toContain(ansis.yellow('⚠'));
		expect(result.output).toContain('Warn task');

		// Spinner after warning icon proves recovery to loading state
		const warningIndex = result.output.indexOf(ansis.yellow('⚠'));
		const afterWarning = result.output.slice(warningIndex);
		expect(hasSpinner(afterWarning)).toBe(true);
	}, { retry: 3 });

	test('group.clear method removes all tasks', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task.group(task => [
					task('Task 1', async () => {
						await setTimeout(50);
						return 1;
					}),
					task('Task 2', async () => {
						await setTimeout(50);
						return 2;
					}),
				]).clear();

				console.log('AFTER_CLEAR');
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toContain('AFTER_CLEAR');
		expect(result.stderr).toContain(ansis.green('✔'));
		expect(result.stderr).toContain(ansiEscapes.cursorRestorePosition + ansiEscapes.eraseDown);
	});
});
