import task from '#tasuku';

const t = await task('Connecting to database', async ({ setError }) => {
	await new Promise((resolve) => { setTimeout(resolve, 500); });
	setError(new Error('Connection refused'));
});

// Keep visible for screenshot
await new Promise((resolve) => { setTimeout(resolve, 3000); });
t.clear();
