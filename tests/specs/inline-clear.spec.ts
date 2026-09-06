import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { nodePty, waitFor } from '../utils/pty.ts';
import { tempDir } from '../utils/temp-dir.ts';

describe('inline clear', () => {
	test('removes every row of a wrapped task title', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				const task = createTasuku({ renderer: inline, outputStream: process.stdout });

				console.log('Keep this message');
				await task('Temporary title that wraps across several rows', async () => {}).clear();
			`,
		}, { tempDir });
		const result = await nodePty(fixture.getPath('test.mjs'), { cols: 20 });
		expect(result.exitCode).toBe(0);
		expect(result.screen).toBe('Keep this message');
	});

	test('coordinates row deletion across inline renderer instances', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				const first = createTasuku({ renderer: inline, outputStream: process.stdout });
				const second = createTasuku({ renderer: inline, outputStream: process.stdout });

				console.log('Keep this message');
				let release;
				const pending = first('First', async ({ setTitle }) => {
					await new Promise(resolve => {
						release = () => {
							setTitle('First updated');
							resolve();
						};
					});
				});
				await second('Temporary', async () => {}).clear();
				release();
				await pending;
			`,
		}, { tempDir });
		const result = await nodePty(fixture.getPath('test.mjs'));
		expect(result.exitCode).toBe(0);
		expect(result.screen).toBe('Keep this message\n✔ First updated');
	});

	test('coordinates row deletion across stdout and stderr renderers', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				const first = createTasuku({ renderer: inline, outputStream: process.stdout });
				const second = createTasuku({ renderer: inline, outputStream: process.stderr });

				console.log('Keep this message');
				let release;
				const pending = first('First', async ({ setTitle }) => {
					await new Promise(resolve => {
						release = () => {
							setTitle('First updated');
							resolve();
						};
					});
				});
				await second('Temporary', async () => {}).clear();
				release();
				await pending;
			`,
		}, { tempDir });
		const result = await nodePty(fixture.getPath('test.mjs'));
		expect(result.exitCode).toBe(0);
		expect(result.screen).toBe('Keep this message\n✔ First updated');
	});

	test('coordinates child insertion across inline renderer instances', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import { createTasuku, inline } from '#tasuku/create';
				const first = createTasuku({ renderer: inline, outputStream: process.stdout });
				const second = createTasuku({ renderer: inline, outputStream: process.stdout });

				let releaseParent;
				let releaseSecond;
				const parentGate = new Promise(resolve => {
					releaseParent = resolve;
				});
				const secondGate = new Promise(resolve => {
					releaseSecond = resolve;
				});
				const parent = first('Parent', async () => {
					await parentGate;
					await first('Child', async () => {});
				});
				const independent = second('Second', async () => {
					await secondGate;
				});
				releaseParent();
				await parent;
				releaseSecond();
				await independent;
			`,
		}, { tempDir });
		const result = await nodePty(fixture.getPath('test.mjs'));
		expect(result.exitCode).toBe(0);
		expect(result.screen).toBe([
			'❯ Parent',
			'  ✔ Child',
			'✔ Second',
		].join('\n'));
	});

	test('does not delete terminal rows after a width change', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				const task = createTasuku({ renderer: inline, outputStream: process.stdout });

				const temporary = task('Temporary', async () => {});
				await temporary;
				console.log('x'.repeat(100));
				console.log('READY');
				await setTimeout(200);
				temporary.clear();
			`,
		}, { tempDir });
		await using subprocess = nodePty(fixture.getPath('test.mjs'));
		await waitFor(subprocess, output => output.includes('READY'));
		await subprocess.resize(40, 24);
		const result = await subprocess;
		expect(result.exitCode).toBe(0);
		expect(result.screen).toBe([
			'✔ Temporary',
			'x'.repeat(40),
			'x'.repeat(40),
			'x'.repeat(20),
			'READY',
		].join('\n'));
	});

	test('renders subsequent task state after a width change', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
				import { setTimeout } from 'node:timers/promises';
				import { createTasuku, inline } from '#tasuku/create';
				const task = createTasuku({ renderer: inline, outputStream: process.stdout });

				await task('Working', async ({ setTitle }) => {
					console.log('READY');
					await setTimeout(200);
					setTitle('Finished');
				});
			`,
		}, { tempDir });
		await using subprocess = nodePty(fixture.getPath('test.mjs'));
		await waitFor(subprocess, output => output.includes('READY'));
		await subprocess.resize(40, 24);
		const result = await subprocess;
		expect(result.exitCode).toBe(0);
		const rows = result.screen.split('\n');
		expect(rows).toHaveLength(3);
		expect(rows[0]).toMatch(/Working$/);
		expect(rows[1]).toBe('READY');
		expect(rows[2]).toBe('✔ Finished');
	});

	for (const { name, code, screen } of [
		{
			name: 'preserves partial console writes when clearing',
			code: `
				await task('Temporary', async () => {
					process.stdout.write('Keep ');
					process.stdout.write('this');
				}).clear();
				await task('Next', async () => {});
			`,
			screen: 'Keep this\n✔ Next',
		},
		{
			name: 'clears only visible rows of a task output spanning scrollback',
			code: String.raw`
				await task('Temporary', async ({ setOutput }) => {
					setOutput(Array.from({ length: 25 }, (_, index) => 'Line ' + index).join('\n'));
				}).clear();
				await task('Next', async () => {});
			`,
			screen: '✔ Temporary\n  → Line 0\n    Line 1\n✔ Next',
		},
		{
			name: 'clears at the bottom of the viewport without losing console history',
			code: String.raw`
				console.log(Array.from({ length: 23 }, (_, index) => 'Log ' + index).join('\n'));
				await task('Parent', async () => {
					await task('Child', async () => {}).clear();
				});
			`,
			screen: [...Array.from({ length: 23 }, (_, index) => `Log ${index}`), '✔ Parent'].join('\n'),
		},
		{
			name: 'leaves scrollback untouched when a cleared task is offscreen',
			code: String.raw`
				const first = task('Offscreen', async () => {});
				await first;
				console.log(Array.from({ length: 25 }, (_, index) => 'Log ' + index).join('\n'));
				first.clear();
				await task('Next', async () => {});
			`,
			screen: ['✔ Offscreen', ...Array.from({ length: 25 }, (_, index) => `Log ${index}`), '✔ Next'].join('\n'),
		},
		{
			name: 'clears wrapped task output',
			code: `
				await task('Temporary', async ({ setOutput }) => setOutput('x'.repeat(100))).clear();
				await task('Next', async () => {});
			`,
			screen: '✔ Next',
		},
		{
			name: 'preserves wrapped console output',
			code: `
				await task('Temporary', async () => console.log('x'.repeat(100))).clear();
				await task('Next', async () => {});
			`,
			screen: `${'x'.repeat(80)}\n${'x'.repeat(20)}\n✔ Next`,
		},
		{
			name: 'removes a completed child',
			code: `
				await task('Parent', async () => {
					await task('Temporary child', async () => {}).clear();
				});
			`,
			screen: '✔ Parent',
		},
		{
			name: 'removes a root and its descendants while preserving console output',
			code: `
				await task('Parent', async () => {
					await task('Child', async () => {});
					console.log('Keep this message');
				}).clear();
				await task('Next task', async ({ setTitle }) => setTitle('Finished'));
			`,
			screen: 'Keep this message\n✔ Finished',
		},
		{
			name: 'removes task output and preview but preserves interleaved console output',
			code: String.raw`
				await task('Parent', async () => {
					await task('Child', async ({ setOutput, streamPreview }) => {
						console.log('Keep this message');
						setOutput('First line\nSecond line');
						streamPreview.end('Preview\n');
					}).clear();
					await task('Next child', async () => {});
				});
			`,
			screen: '❯ Parent\n  ✔ Next child\nKeep this message',
		},
		{
			name: 'clears a group without deleting a retained sibling',
			code: `
				await task('Parent', async () => {
					await task('Retained', async () => {});
					await task.group(groupTask => [
						groupTask('First', async () => {}),
						groupTask('Second', async () => {}),
					]).clear();
					await task('Last', async () => {});
				});
			`,
			screen: '❯ Parent\n  ✔ Retained\n  ✔ Last',
		},
	]) {
		test(name, async () => {
			await using fixture = await createFixture({
				'test.mjs': `
					import { createTasuku, inline } from '#tasuku/create';
					const task = createTasuku({ renderer: inline, outputStream: process.stdout });
					${code}
				`,
			}, { tempDir });
			const result = await nodePty(fixture.getPath('test.mjs'));
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe(screen);
		});
	}
});
