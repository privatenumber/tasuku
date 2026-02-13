import { describe, test, expect, onTestFail } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { nodePty } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';
import { assertInOrder } from '../utils/assert-order.ts';

describe('console interleaving', () => {
	test('console.logs between tasks appear in order', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';

			console.log('Before any tasks');

			await task('First task', async () => {
				console.log('Inside first task');
			});

			console.log('Between tasks');

			await task('Second task', async () => {
				console.log('Inside second task');
			});

			console.log('After all tasks');
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toBe(
			'Before any tasks\n'
			+ 'Inside first task\n'
			+ 'Between tasks\n'
			+ 'Inside second task\n'
			+ 'After all tasks',
		);

		expect(result.stderr).toContain(`${ansis.green('✔')} First task`);
		expect(result.stderr).toContain(`${ansis.green('✔')} Second task`);
	});

	test('console.logs with nested tasks', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';

			console.log('1: Start');

			await task('Parent task', async () => {
				console.log('2: Inside parent');

				await task('Child task 1', async () => {
					console.log('3: Inside child 1');
				});

				console.log('4: Between children');

				await task('Child task 2', async () => {
					console.log('5: Inside child 2');
				});

				console.log('6: After children');
			});

			console.log('7: End');
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toBe(
			'1: Start\n'
			+ '2: Inside parent\n'
			+ '3: Inside child 1\n'
			+ '4: Between children\n'
			+ '5: Inside child 2\n'
			+ '6: After children\n'
			+ '7: End',
		);

		expect(result.stderr).toContain(`${ansis.yellow('❯')} Parent task`);
		expect(result.stderr).toContain(`${ansis.green('✔')} Child task 1`);
		expect(result.stderr).toContain(`${ansis.green('✔')} Child task 2`);
	});

	test('console.logs with task.group parallel execution', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';

			console.log('Before group');

			await task.group(task => [
				task('Task A', async () => {
					console.log('A: Start');
					console.log('A: End');
				}),
				task('Task B', async () => {
					console.log('B: Start');
					console.log('B: End');
				}),
				task('Task C', async () => {
					console.log('C: Start');
					console.log('C: End');
				}),
			]);

			console.log('After group');
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toBe(
			'Before group\n'
			+ 'A: Start\n'
			+ 'A: End\n'
			+ 'B: Start\n'
			+ 'B: End\n'
			+ 'C: Start\n'
			+ 'C: End\n'
			+ 'After group',
		);

		expect(result.stderr).toContain(`${ansis.green('✔')} Task A`);
		expect(result.stderr).toContain(`${ansis.green('✔')} Task B`);
		expect(result.stderr).toContain(`${ansis.green('✔')} Task C`);
	});

	test('console.logs with mixed states', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';

			console.log('1: Starting tests');

			await task('Success task', async () => {
				console.log('2: Will succeed');
			});

			console.log('3: First task done');

			await task('Warning task', async ({ setWarning }) => {
				console.log('4: Will warn');
				setWarning('This is a warning');
			});

			console.log('5: Warning task done');

			try {
				await task('Error task', async ({ setError }) => {
					console.log('6: Will error');
					setError('This is an error');
					throw new Error('Task failed');
				});
			} catch (error) {
				console.log('7: Error caught');
			}

			console.log('8: All done');
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toBe(
			'1: Starting tests\n'
			+ '2: Will succeed\n'
			+ '3: First task done\n'
			+ '4: Will warn\n'
			+ '5: Warning task done\n'
			+ '6: Will error\n'
			+ '7: Error caught\n'
			+ '8: All done',
		);

		expect(result.stderr).toContain(`${ansis.green('✔')} Success task`);
		expect(result.stderr).toContain(`${ansis.yellow('⚠')} Warning task`);
		expect(result.stderr).toContain(`${ansis.gray('→ This is a warning')}`);
		expect(result.stderr).toContain(`${ansis.red('✖')} Error task`);
		expect(result.stderr).toContain(`${ansis.gray('→ Task failed')}`);
	});

	test('rapid console.logs during task execution', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';

			await task('Task with many logs', async ({ setStatus }) => {
				for (let i = 1; i <= 5; i++) {
					console.log(\`Log \${i}\`);
					setStatus(\`Step \${i}/5\`);
				}
			});
		`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stdout).toBe(
			'Log 1\n'
			+ 'Log 2\n'
			+ 'Log 3\n'
			+ 'Log 4\n'
			+ 'Log 5',
		);

		expect(result.stderr).toContain(`${ansis.green('✔')} Task with many logs ${ansis.dim('[Step 5/5]')}`);
	});

	test('console output interspersed with task clearing', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			let counter = 0;
			console.log(counter++);

			const interval = setInterval(() => {
				console.log(counter++);
			}, 100);

			const p = task('Some task', async () => {
				await setTimeout(500);
				await task('Nested task', async () => {
					await setTimeout(500);
				});
			});
			await p;

			clearInterval(interval);
			p.clear();
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));

		expect(result.stderr).toContain(ansiEscapes.cursorRestorePosition);
		expect(result.stderr).toContain(ansiEscapes.eraseDown);
		expect(result.stdout).toContain('0');
	});

	test('console.logs during task survive terminal scroll', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';
			import { setTimeout } from 'node:timers/promises';

			await task('Scroll test task', async () => {
				for (let i = 0; i < 20; i++) {
					console.log('log-' + String(i).padStart(2, '0'));
					await setTimeout(30);
				}
			});
			`,
		}, { tempDir });

		// Regression: small terminal causes scroll, which invalidates
		// the saved cursor position unless re-anchored with relative cursorUp.
		const result = await nodePty(fixture.getPath('test.mjs'), { rows: 8 });
		expect(result.exitCode).toBe(0);

		expect(result.output).toContain(ansiEscapes.cursorUp(1));
		expect(result.output).toContain('✔');
		expect(result.output).toContain('Scroll test task');
	}, { retry: 3 });

	describe('console routing', () => {
		test('console.error between tasks persists on stderr', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				console.error('before');

				await task('A', async () => {
					console.error('inside A');
				});

				console.error('between');

				await task('B', async () => {
					console.error('inside B');
				});

				console.error('after');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			onTestFail(() => { console.log(result); });

			assertInOrder(result.stderr, [
				'before',
				'inside A',
				'between',
				'inside B',
				'after',
			]);
		});

		test('console.warn between tasks persists on stderr', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';

				console.warn('before');

				await task('A', async () => {
					console.warn('inside A');
				});

				console.warn('between');

				await task('B', async () => {
					console.warn('inside B');
				});

				console.warn('after');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			onTestFail(() => { console.log(result); });

			assertInOrder(result.stderr, [
				'before',
				'inside A',
				'between',
				'inside B',
				'after',
			]);
		});

		test('stdout.write after task completion is not overwritten', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import task from '#tasuku';
				import { setTimeout } from 'node:timers/promises';

				await task('Task', () => setTimeout(100));
				process.stdout.write('Should not get overwritten');
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			onTestFail(() => { console.log(result); });

			expect(result.stdout).toContain('Should not get overwritten');
			expect(result.stdout).not.toContain(ansiEscapes.eraseDown);
		});
	});
});
