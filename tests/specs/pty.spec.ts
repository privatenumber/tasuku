import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { nodePty } from '../utils/pty.js';
import { tempDir } from '../utils/temp-dir.js';

export default testSuite(({ describe }) => {
	describe('PTY terminal integration', ({ test }) => {
		for (const exitCode of [0, 1]) {
			test(`drains final output before resolving exit code ${exitCode}`, async () => {
				await using fixture = await createFixture({
					'test.mjs': String.raw`
					process.stdout.write('old\r\x1b[2Kdone\n');
					process.stderr.write('details\n');
					process.exitCode = ${exitCode};
					`,
				}, { tempDir });
				const subprocess = nodePty(fixture.getPath('test.mjs'));
				const result = await subprocess;
				expect(result.exitCode).toBe(exitCode);
				expect(result.rawOutput).toContain('old');
				expect(result.screen).toBe('done\ndetails');
				expect(await subprocess.getScreen()).toBe(result.screen);
				await subprocess.resize(10, 5);
				expect(await subprocess.getScreen()).toBe(result.screen);
			});
		}

		test('live snapshots and resize share the PTY output stream', async () => {
			await using fixture = await createFixture({
				'test.mjs': String.raw`
				process.stdin.resume();
				process.stdout.once('resize', () => {
					console.log(process.stdout.columns + 'x' + process.stdout.rows);
					console.log('abcdef');
					process.stdin.pause();
				});
				console.log('OK');
				`,
			}, { tempDir });
			await using subprocess = nodePty(fixture.getPath('test.mjs'), {
				cols: 8,
				rows: 3,
			});
			let resized = false;
			for await (const _chunk of subprocess) {
				if (subprocess.rawOutput.includes('OK')) {
					expect(await subprocess.getScreen()).toBe('OK');
					await subprocess.resize(4, 4);
					resized = true;
					break;
				}
			}
			const result = await subprocess;
			expect(resized).toBe(true);
			expect(result.exitCode).toBe(0);
			expect(result.screen).toBe('OK\n4x4\nabcd\nef');
		});

		test('writes input without echoing it to the terminal', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				process.stdin.setRawMode(true);
				process.stdin.once('data', () => {
					console.log('received');
					process.stdin.pause();
				});
				console.log('ready');
				`,
			}, { tempDir });
			await using subprocess = nodePty(fixture.getPath('test.mjs'));
			for await (const _chunk of subprocess) {
				const screen = await subprocess.getScreen();
				if (screen.includes('ready')) {
					subprocess.write('continue');
					break;
				}
			}
			const result = await subprocess;
			expect(result.screen).toBe('ready\nreceived');
			expect(result.rawOutput).not.toContain('continue');
		});

		test('disposal settles pending snapshots and retains the final screen', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				console.log('READY');
				setInterval(() => {}, 1000);
				`,
			}, { tempDir });
			const subprocess = nodePty(fixture.getPath('test.mjs'));
			for await (const _chunk of subprocess) {
				if (subprocess.rawOutput.includes('READY')) {
					break;
				}
			}
			const snapshot = subprocess.getScreen();
			await subprocess[Symbol.asyncDispose]();
			expect(await snapshot).toBe('READY');
			expect(await subprocess.getScreen()).toBe('READY');
		});
	});
});
