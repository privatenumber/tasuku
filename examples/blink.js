import { setTimeout } from 'node:timers/promises';
// eslint-disable-next-line import-x/extensions -- resolved via package exports map
import task from 'tasuku/blink';

await task('Simmering…', async ({ setTitle }) => {
	await setTimeout(5000);
	setTitle('Simmered to perfection');
}, { showTime: true });

await task('Percolating…', async ({ setTitle }) => {
	await setTimeout(4000);
	setTitle('Fully percolated');
}, { showTime: true });

await task('Crystallizing…', async ({ setTitle }) => {
	await setTimeout(6000);
	setTitle('Crystallized');
}, { showTime: true });
