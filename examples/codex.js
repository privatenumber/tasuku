import { setTimeout } from 'node:timers/promises';
// eslint-disable-next-line import-x/extensions -- resolved via package exports map
import task from 'tasuku/codex';

await task('Installing dependencies', async ({ setTitle }) => {
	await setTimeout(5000);
	setTitle('Installed dependencies');
}, { showTime: true });

await task('Running tests', async ({ setTitle }) => {
	await setTimeout(4000);
	setTitle('Tests passed');
}, { showTime: true });

await task('Analyzing codebase', async ({ setTitle }) => {
	await setTimeout(6000);
	setTitle('Analysis complete');
}, { showTime: true });
