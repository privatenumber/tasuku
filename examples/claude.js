import { setTimeout } from 'node:timers/promises';
// eslint-disable-next-line import-x/extensions -- resolved via package exports map
import task from 'tasuku/claude';

await task('Simmering…', async ({ setTitle }) => {
	await setTimeout(2000);
	setTitle('Simmered to perfection');
});

await task('Percolating…', async ({ setTitle }) => {
	await setTimeout(4000);
	setTitle('Fully percolated');
}, { showTime: true });

await task('Crystallizing…', async ({ setTitle }) => {
	await setTimeout(3000);
	setTitle('Crystallized');
});
