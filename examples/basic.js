import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

await task('Copying file from path A to B', async ({ setTitle }) => {
	await setTimeout(1500);
	setTitle('Successfully copied file from path A to B!');
});
