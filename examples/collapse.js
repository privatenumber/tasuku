import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

await task('Do task', async ({ task }) => {
	await setTimeout(500);

	const nestedTask = await task('Do another task', async () => {
		await setTimeout(500);
	});

	nestedTask.clear();
});
