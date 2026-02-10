import { setTimeout } from 'node:timers/promises';
import task from '#tasuku';

// Show all task states at a frozen moment
// Uses concurrency: 1 so tasks run sequentially, keeping later ones pending
const tasks = task.group(task => [
	task('Success task', async () => {
		await setTimeout(100);
	}),

	task('Warning task', async ({ setWarning }) => {
		await setTimeout(100);
		setWarning('Something might be wrong');
	}),

	task('Error task', async ({ setError }) => {
		await setTimeout(100);
		setError(new Error('Something went wrong'));
	}),

	task('Loading task', async () => {
		// This stays loading while screenshot is taken
		await setTimeout(5000);
	}),

	task('Pending task', async () => {
		// Stays pending because Loading task takes 5s
		await setTimeout(100);
	}),
], { concurrency: 1 });
await tasks;

tasks.clear();
