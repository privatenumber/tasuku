import fs from 'node:fs/promises';
import path from 'node:path';
import spawn from 'nano-spawn';
import task from '#tasuku';

// VHS runs `node {file}` — `import from 'tasuku'` resolves via package.json exports to dist/
await fs.access('dist/index.mjs').catch(() => {
	throw new Error('dist/ not found — run `pnpm build` first');
});

const defaults: Record<string, string> = {
	Theme: 'Dracula',
	FontFamily: 'Menlo',
	FontSize: '32',
	Width: '1200',
	Height: '400',
	Padding: '40',
	WindowBar: 'Colorful',
	WindowBarSize: '80',
	BorderRadius: '8',
	CursorBlink: 'false',
};

const quoteValue = (value: string) => {
	if (!Number.isNaN(Number(value)) || value === 'true' || value === 'false') {
		return value;
	}
	return `"${value}"`;
};

type MediaBlock = {
	vhsBody: string;
	imgSrc: string;
	jsCode: string;
};

const parseMediaBlocks = (readme: string): MediaBlock[] => {
	const demoBlockRegex = /<p[^>]+\bdemo\b[^>]*>([\s\S]*?)<\/p>/g;
	const imgSrcRegex = /<img\s[^>]*src="(\.github\/media\/[^"]+)"/;
	const vhsCommentRegex = /<!--\s*@vhs\n([\s\S]*?)-->/;
	const jsBlockRegex = /```js\n([\s\S]*?)```/;

	const blocks: MediaBlock[] = [];

	for (const demoMatch of readme.matchAll(demoBlockRegex)) {
		const content = demoMatch[1];

		const imgMatch = content.match(imgSrcRegex);
		const vhsMatch = content.match(vhsCommentRegex);
		const jsMatch = content.match(jsBlockRegex);

		if (!imgMatch || !vhsMatch || !jsMatch) {
			console.warn('Incomplete <p demo> block, skipping');
			continue;
		}

		blocks.push({
			vhsBody: vhsMatch[1].trim(),
			imgSrc: imgMatch[1],
			jsCode: jsMatch[1],
		});
	}

	return blocks;
};

const filterName = process.argv[2];

const readme = await fs.readFile('README.md', 'utf8');
const allBlocks = parseMediaBlocks(readme);

const blocks = filterName
	? allBlocks.filter((block) => {
		const baseName = path.basename(block.imgSrc, path.extname(block.imgSrc));
		return baseName.includes(filterName);
	})
	: allBlocks;

if (blocks.length === 0) {
	const available = allBlocks.map(b => path.basename(b.imgSrc, path.extname(b.imgSrc))).join(', ');
	throw new Error(`No media block matching "${filterName}". Available: ${available}`);
}

await task.group(
	task => blocks.map(
		(block) => {
			const extension = path.extname(block.imgSrc);
			const baseName = path.basename(block.imgSrc, extension);

			return task(`Generate ${baseName}${extension}`, async ({ streamPreview }) => {
				const jsFileName = `${baseName}.js`;
				await fs.writeFile(jsFileName, block.jsCode);

				// Replace {file} placeholder with temp JS filename
				let vhsBodyResolved = block.vhsBody.replaceAll('{file}', jsFileName);

				// Clear screen, hide cursor, and suppress shell prompt after script exits
				vhsBodyResolved = vhsBodyResolved.replace(
					`node ${jsFileName}`,
					String.raw`clear && printf '\e[?25l' && node ${jsFileName} && sleep 10`,
				);

				// VHS requires an Output directive (always a GIF)
				const gifPath = extension === '.gif' ? block.imgSrc : `${path.dirname(block.imgSrc)}/${baseName}.gif`;

				// Assemble tape: Output + shared defaults + VHS body
				// VHS uses last-wins for Set directives, so body overrides defaults
				let tape = `Output ${gifPath}\n`;
				for (const [key, value] of Object.entries(defaults)) {
					tape += `Set ${key} ${quoteValue(value)}\n`;
				}
				tape += `\n${vhsBodyResolved}\n`;

				const tempTape = path.join(path.dirname(block.imgSrc), `.${baseName}.tape`);
				await fs.writeFile(tempTape, tape);

				try {
					const subprocess = spawn('vhs', [tempTape]);
					const childProcess = await subprocess.nodeChildProcess;
					childProcess.stdout?.pipe(streamPreview, { end: false });
					childProcess.stderr?.pipe(streamPreview, { end: false });
					await subprocess;
					streamPreview.clear();
				} finally {
					const cleanups = [
						fs.unlink(jsFileName).catch(() => {}),
						fs.unlink(tempTape).catch(() => {}),
					];

					// VHS always outputs a GIF; clean it up when target is a different format
					if (gifPath !== block.imgSrc) {
						cleanups.push(fs.unlink(gifPath).catch(() => {}));
					}

					await Promise.all(cleanups);
				}
			}, { showTime: true });
		},
	),
);
