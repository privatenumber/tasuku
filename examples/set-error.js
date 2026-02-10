import { setTimeout } from 'node:timers/promises';
import task from '#tasuku';

const p = task('Connecting to database', async ({ setError }) => {
	await setTimeout(500);
	setError(new Error('Connection refused'));
});
await p;

// Keep visible for screenshot
await setTimeout(3000);
p.clear();
