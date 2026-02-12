import { Writable } from 'node:stream';
import { testSuite } from 'manten';
import { expectTypeOf } from 'expect-type';
import { createTasuku, theme } from '#tasuku';

const task = createTasuku({
	theme,
	outputStream: new Writable({ write: (_, __, callback) => { callback(); } }) as NodeJS.WriteStream,
});

export default testSuite(({ describe }) => {
	describe('type inference', ({ test }) => {
		test('task() return type - number', async () => {
			const result = await task('title', async () => 123);
			expectTypeOf(result).toBeNumber();
		});

		test('task() return type - string', async () => {
			const result = await task('title', async () => 'hello');
			expectTypeOf(result).toBeString();
		});

		test('task() return type - boolean', async () => {
			const result = await task('title', async () => false);
			expectTypeOf(result).toBeBoolean();
		});

		test('task.group() return type inference', async () => {
			const groupTasks = await task.group(task => [
				task('title', async () => 123),
				task('title', async () => 'hello'),
				task('title', async () => false),
			]);

			expectTypeOf(groupTasks[0]).toBeNumber();
			expectTypeOf(groupTasks[1]).toBeString();
			expectTypeOf(groupTasks[2]).toBeBoolean();
		});

		test('nested task return type', async () => {
			const result = await task('title', async () => {
				const nestedResult = await task('nested', async () => 'nested value');
				expectTypeOf(nestedResult).toBeString();
				return 42;
			});

			expectTypeOf(result).toBeNumber();
		});
	});
});
