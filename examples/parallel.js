import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

await task.group(task => [
	task('Task 1', async () => {
		await setTimeout(1500);
	}),

	task('Task 2', async () => {
		await setTimeout(1500);
	}),
], { concurrency: 2 });
