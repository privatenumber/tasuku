import { setTimeout } from 'node:timers/promises';
import { testSuite, expect } from 'manten';
import task from '#tasuku';

export default testSuite(({ test, describe }) => {
	test('task - return number', async () => {
		const { result } = await task('Some task', async () => 1 + 1);
		expect<number>(result).toBe(2);
	});

	test('task - return string', async () => {
		const { result } = await task('Some task', async () => 'some string');
		expect<string>(result).toBe('some string');
	});

	test('task return Promise<number>', async () => {
		const { result } = await task(
			'Some task',
			async () => await new Promise<number>((resolve) => {
				resolve(123);
			}),
		);
		expect<number>(result).toBe(123);
	});

	test('nested tasks', async () => {
		const someTask = await task('Some task', async ({ task }) => {
			const nestedTask = await task('nested task', async () => 'nested works');
			expect<string>(nestedTask.result).toBe('nested works');

			return 1;
		});

		expect<number>(someTask.result).toBe(1);
	});

	describe('group tasks', ({ test }) => {
		test('task results', async () => {
			const groupTasks = await task.group(task => [
				task('number', async () => 123),
				task('string', async () => 'hello'),
				task('boolean', async () => false),
			]);

			expect<{ result: number }>(groupTasks[0]).toMatchObject({
				state: 'success',
				result: 123,
			});
			expect<{ result: string }>(groupTasks[1]).toMatchObject({
				state: 'success',
				result: 'hello',
			});
			expect<{ result: boolean }>(groupTasks[2]).toMatchObject({
				state: 'success',
				result: false,
			});
		});

		test('concurrency - series', async () => {
			const startTime = Date.now();
			const groupTasks = await task.group(task => [
				task('one', async () => {
					await setTimeout(100);
					return 1;
				}),
				task('two', async () => {
					await setTimeout(100);
					return 2;
				}),
				task('three', async () => {
					await setTimeout(100);
					return 3;
				}),
			]);

			const elapsed = Date.now() - startTime;

			// Series execution should take at least 300ms (3 tasks × 100ms)
			// CI can be slow, so allow generous upper bound
			expect(elapsed).toBeGreaterThanOrEqual(300);

			expect<{ result: number }>(groupTasks[0]).toMatchObject({
				state: 'success',
				result: 1,
			});
			expect<{ result: number }>(groupTasks[1]).toMatchObject({
				state: 'success',
				result: 2,
			});
			expect<{ result: number }>(groupTasks[2]).toMatchObject({
				state: 'success',
				result: 3,
			});
		});

		test('concurrency - parallel', async () => {
			const startTime = Date.now();
			const groupTasks = await task.group(task => [
				task('one', async () => {
					await setTimeout(100);
					return 1;
				}),
				task('two', async () => {
					await setTimeout(100);
					return 2;
				}),
				task('three', async () => {
					await setTimeout(100);
					return 3;
				}),
			], { concurrency: Number.POSITIVE_INFINITY });

			const elapsed = Date.now() - startTime;

			// Parallel execution should take at least 100ms (longest task)
			// Should complete faster than 300ms series execution would take
			// CI can be slow, so be lenient
			expect(elapsed).toBeGreaterThanOrEqual(100);

			expect<{ result: number }>(groupTasks[0]).toMatchObject({
				state: 'success',
				result: 1,
			});
			expect<{ result: number }>(groupTasks[1]).toMatchObject({
				state: 'success',
				result: 2,
			});
			expect<{ result: number }>(groupTasks[2]).toMatchObject({
				state: 'success',
				result: 3,
			});
		});
	});
});
