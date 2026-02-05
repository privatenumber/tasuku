import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

await task.group(task => [
	task('Task 1', async () => {
		await setTimeout(1000);
		return 'one';
	}),

	task('Waiting for Task 1', async ({ setTitle }) => {
		setTitle('Task 2 running...');
		await setTimeout(1000);
		setTitle('Task 2 complete');
		return 'two';
	}),
]);
