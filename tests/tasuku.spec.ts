import task from '../src/index';

const sleep = (ms: number): Promise<void> => new Promise((resolve) => {
	setTimeout(resolve, ms);
});

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

test('group tasks', async () => {
	const groupTasks = await task.group(task => [
		task('number', async () => 123),
		task('string', async () => 'hello'),
		task('boolean', async () => false),
	]);

	expect<[
		number,
		string,
		boolean,
	]>(groupTasks.results).toEqual([
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
