import task from '#tasuku';

await task('Installing dependencies', async ({ setTitle, setStatus, setOutput }) => {
	setStatus('npm install');
	setOutput('Resolving packages...');

	await new Promise((resolve) => { setTimeout(resolve, 2000); });

	setOutput('Added 50 packages');
	await new Promise((resolve) => { setTimeout(resolve, 500); });

	setTitle('Installed dependencies');
});
