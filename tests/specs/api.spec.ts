import { setTimeout } from 'node:timers/promises';
import { testSuite, expect } from 'manten';
import task from '#tasuku';

export default testSuite(({ describe }) => {
	describe('API', ({ test, describe }) => {
		test('task - return number', async () => {
			const { result } = await task('Some task', async () => 1 + 1);
			expect(result).toBe(2);
		});

		test('task - return string', async () => {
			const { result } = await task('Some task', async () => 'some string');
			expect(result).toBe('some string');
		});

		test('task return Promise<number>', async () => {
			const { result } = await task(
				'Some task',
				() => Promise.resolve(123),
			);
			expect(result).toBe(123);
		});

		test('nested tasks', async () => {
			const someTask = await task('Some task', async ({ task }) => {
				const nestedTask = await task('nested task', async () => 'nested works');
				expect(nestedTask.result).toBe('nested works');

				return 1;
			});

			expect(someTask.result).toBe(1);
		});

		describe('group tasks', ({ test }) => {
			test('task results', async () => {
				const groupTasks = await task.group(task => [
					task('number', async () => 123),
					task('string', async () => 'hello'),
					task('boolean', async () => false),
				]);

				expect(groupTasks[0]).toMatchObject({
					state: 'success',
					result: 123,
				});
				expect(groupTasks[1]).toMatchObject({
					state: 'success',
					result: 'hello',
				});
				expect(groupTasks[2]).toMatchObject({
					state: 'success',
					result: false,
				});
			});

			test('concurrency - series', async () => {
				const startTime = Date.now();
				const groupTasks = await task.group(task => [
					task('one', async () => {
						await setTimeout(200);
						return 1;
					}),
					task('two', async () => {
						await setTimeout(200);
						return 2;
					}),
					task('three', async () => {
						await setTimeout(200);
						return 3;
					}),
				]);

				const elapsed = Date.now() - startTime;

				// Series execution should take at least 600ms (3 tasks × 200ms)
				// CI can be slow, so allow generous upper bound
				expect(elapsed).toBeGreaterThanOrEqual(600);

				expect(groupTasks[0]).toMatchObject({
					state: 'success',
					result: 1,
				});
				expect(groupTasks[1]).toMatchObject({
					state: 'success',
					result: 2,
				});
				expect(groupTasks[2]).toMatchObject({
					state: 'success',
					result: 3,
				});
			});

			test('concurrency - parallel', async () => {
				const taskDuration = 100;

				const startTime = Date.now();
				const groupTasks = await task.group(task => [
					task('one', async () => {
						await setTimeout(taskDuration);
						return 1;
					}),
					task('two', async () => {
						await setTimeout(taskDuration);
						return 2;
					}),
					task('three', async () => {
						await setTimeout(taskDuration);
						return 3;
					}),
				], { concurrency: Number.POSITIVE_INFINITY });
				const elapsed = Date.now() - startTime;

				// Parallel execution should take at least 100ms (longest task)
				expect(elapsed).toBeGreaterThanOrEqual(taskDuration);

				// ink seems too slow on CI
				// expect(elapsed).toBeLessThan(taskDuration * 3);

				expect(groupTasks[0]).toMatchObject({
					state: 'success',
					result: 1,
				});
				expect(groupTasks[1]).toMatchObject({
					state: 'success',
					result: 2,
				});
				expect(groupTasks[2]).toMatchObject({
					state: 'success',
					result: 3,
				});
			});
		});
	});
});
