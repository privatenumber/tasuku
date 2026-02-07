import { spawn } from 'node:child_process';
import { pipeline } from 'node:stream/promises';
import task from '#tasuku';

// Rate-limited to 2MB/s so progress is visible (~4 seconds for ~9MB file)
await task('Download TypeScript', async ({ streamPreview }) => {
	const child = spawn('curl', [
		'--limit-rate',
		'2m',
		'-o',
		'/dev/null',
		'https://cdn.jsdelivr.net/npm/typescript@latest/lib/typescript.js',
	]);
	await pipeline(child.stderr, streamPreview);
});
