import task from '../src/index';

const expectType = <T>(value: T) => {}; // eslint-disable-line @typescript-eslint/no-empty-function
const sleep = (ms: number): Promise<void> => new Promise((resolve) => {
	setTimeout(resolve, ms);
});

test('task - return number', async () => {
	const { result } = await task('Some task', async () => 1 + 1);
	expectType<number>(result);
	expect(result).toBe(2);
});

test('task - return string', async () => {
	const { result } = await task('Some task', async () => 'some string');
	expectType<string>(result);
	expect(result).toBe('some string');
});

test('task return Promise<number>', async () => {
	const { result } = await task(
		'Some task',
		async () => await new Promise<number>((resolve) => {
			resolve(123);
		}),
	);
	expectType<number>(result);
	expect(result).toBe(123);
});

test('nested tasks', async () => {
	const someTask = await task('Some task', async ({ task }) => {
		const nestedTask = await task('nested task', async () => 'nested works');
		expectType<string>(nestedTask.result);
		expect(nestedTask.result).toBe('nested works');

		return 1;
	});

	expectType<number>(someTask.result);
	expect(someTask.result).toBe(1);
});

test('group tasks', async () => {
	const groupTasks = await task.group(task => [
		task('number', async () => 123),
		task('string', async () => 'hello'),
		task('boolean', async () => false),
	]);

	expectType<[
		number,
		string,
		boolean,
	]>(groupTasks.results);
	expect(groupTasks.results).toEqual([
		123,
		'hello',
		false,
	]);
});

test('group tasks - concurrency - series', async () => {
	const startTime = Date.now();
	const groupTasks = await task.group(task => [
		task('one', async () => {
			await sleep(100);
			return 1;
		}),
		task('two', async () => {
			await sleep(100);
			return 2;
		}),
		task('three', async () => {
			await sleep(100);
			return 3;
		}),
	]);

	const elapsed = Date.now() - startTime;

	expect(elapsed > 300 && elapsed < 400).toBe(true);
	expect(groupTasks.results).toEqual([1, 2, 3]);
});

test('group tasks - concurrency - parallel', async () => {
	const startTime = Date.now();
	const groupTasks = await task.group(task => [
		task('one', async () => {
			await sleep(100);
			return 1;
		}),
		task('two', async () => {
			await sleep(100);
			return 2;
		}),
		task('three', async () => {
			await sleep(100);
			return 3;
		}),
	], { concurrency: Number.POSITIVE_INFINITY });

	const elapsed = Date.now() - startTime;

	expect(elapsed > 100 && elapsed < 200).toBe(true);
	expect(groupTasks.results).toEqual([1, 2, 3]);
});
