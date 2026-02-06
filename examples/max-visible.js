import { setTimeout } from 'node:timers/promises';
import task from 'tasuku';

await task.group(task => Array.from({ length: 20 }, (_, i) => task(`Task ${i + 1}`, async () => {
	await setTimeout(500 + Math.random() * 1500);
})),
{
	concurrency: 5,
	maxVisible: 8,
});
