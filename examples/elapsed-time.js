import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

await task('Installing dependencies', async () => {
	await setTimeout(3000);
}, { showTime: true });
