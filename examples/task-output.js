import { setTimeout } from 'node:timers/promises';
import task from '#tasuku';

await task('Installing dependencies', async ({ setTitle, setStatus, setOutput }) => {
	setStatus('npm install');
	setOutput('Resolving packages...');

	await setTimeout(2000);

	setOutput('Added 50 packages');
	await setTimeout(500);

	setTitle('Installed dependencies');
});
