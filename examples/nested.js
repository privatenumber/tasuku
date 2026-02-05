import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

await task('Do task', async ({ task }) => {
	await setTimeout(500);

	await task('Do another task', async ({ task }) => {
		await setTimeout(500);

		await task('And another', async () => {
			await setTimeout(500);
		});
	});
});
