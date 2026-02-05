import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

task('Task 1', async () => {
	await setTimeout(1000);
});

task('Task 2', async ({ setTitle }) => {
	await setTimeout(1500);
	setTitle('Task 2 complete');
});
