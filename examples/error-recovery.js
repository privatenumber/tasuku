import task from '#tasuku';

await task('Connecting to database', async ({ setError, setStatus }) => {
	for (let attempt = 1; attempt <= 3; attempt += 1) {
		setStatus(`attempt ${attempt}/3`);
		await new Promise((resolve) => { setTimeout(resolve, 500); });

		if (attempt < 3) {
			setError(`Connection refused (attempt ${attempt})`);
			await new Promise((resolve) => { setTimeout(resolve, 1000); });
			setError();
		}
	}
});
