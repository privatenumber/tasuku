import task from '#tasuku';

// Show all task states at a frozen moment
// Uses concurrency: 1 so tasks run sequentially, keeping later ones pending
const tasks = await task.group(task => [
	task('Success task', async () => {
		await new Promise((resolve) => { setTimeout(resolve, 100); });
	}),

	task('Warning task', async ({ setWarning }) => {
		await new Promise((resolve) => { setTimeout(resolve, 100); });
		setWarning('Something might be wrong');
	}),

	task('Error task', async ({ setError }) => {
		await new Promise((resolve) => { setTimeout(resolve, 100); });
		setError(new Error('Something went wrong'));
	}),

	task('Loading task', async () => {
		// This stays loading while screenshot is taken
		await new Promise((resolve) => { setTimeout(resolve, 5000); });
	}),

	task('Pending task', async () => {
		// Stays pending because Loading task takes 5s
		await new Promise((resolve) => { setTimeout(resolve, 100); });
	}),
], { concurrency: 1 });

tasks.clear();
