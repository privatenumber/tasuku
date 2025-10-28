import { testSuite } from 'manten';
import { expectTypeOf } from 'expect-type';
import task from '#tasuku';

export default testSuite(({ describe }) => {
	describe('type inference', ({ test }) => {
		test('task() return type - number', async () => {
			const simpleTask = await task('title', async () => 123);
			expectTypeOf(simpleTask.result).toBeNumber();
		});

		test('task() return type - string', async () => {
			const stringTask = await task('title', async () => 'hello');
			expectTypeOf(stringTask.result).toBeString();
		});

		test('task() return type - boolean', async () => {
			const booleanTask = await task('title', async () => false);
			expectTypeOf(booleanTask.result).toBeBoolean();
		});

		test('task.group() return type inference', async () => {
			const groupTasks = await task.group(task => [
				task('title', async () => 123),
				task('title', async () => 'hello'),
				task('title', async () => false),
			]);

			expectTypeOf(groupTasks[0].result).toBeNumber();
			expectTypeOf(groupTasks[1].result).toBeString();
			expectTypeOf(groupTasks[2].result).toBeBoolean();
		});
	});
});
