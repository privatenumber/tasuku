import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

task('Task 1', async () => {
	await setTimeout(1000);
});

task('Task 2', async () => {
	await setTimeout(1500);
});

task('Task 3', async () => {
	await setTimeout(2000);
});
