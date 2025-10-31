import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansiRegex from 'ansi-regex';
import yoctocolors from 'yoctocolors';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

// Non-color ANSI codes that are allowed even when colors are disabled
const nonColorAnsiCodes = new Set([
	ansiEscapes.cursorHide,
	ansiEscapes.cursorShow,
	ansiEscapes.eraseLine,
	ansiEscapes.cursorUp(),
	ansiEscapes.cursorDown(),
	ansiEscapes.cursorLeft,
]);

export default testSuite(({ describe }) => {
	describe('environment', ({ describe }) => {
		describe('CI mode', ({ test }) => {
			test('CI=true disables ANSI clearing', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(100);
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: 'true',
				});
				expect(result.stderr).toBe('');

				// Should NOT contain ANSI cursor movement codes
				expect(result.stdout).not.toContain(ansiEscapes.cursorUp());
				expect(result.stdout).not.toContain(ansiEscapes.eraseLine);
			});

			test('GITHUB_ACTIONS=true does not disable ANSI clearing', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(100);
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					GITHUB_ACTIONS: 'true',
				});
				expect(result.stderr).toBe('');

				// Only respects CI env var, not GITHUB_ACTIONS
				expect(result.stdout).toContain(ansiEscapes.cursorUp());
				expect(result.stdout).toContain(ansiEscapes.eraseLine);
			});

			test('CI mode still shows final task states', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task', async () => {
						await setTimeout(50);
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: 'true',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain(yoctocolors.green('✔'));
				expect(result.stdout).toContain('Task');
			});
		});

		describe('color environment variables', ({ test }) => {
			test('environment variables disable colors', async () => {
				const envVariables = [
					{
						name: 'NO_COLOR',
						value: '1',
					},
					{
						name: 'NODE_DISABLE_COLORS',
						value: '1',
					},
					{
						name: 'FORCE_COLOR',
						value: '0',
					},
				];

				for (const { name, value } of envVariables) {
					await using fixture = await createFixture({
						'test.mjs': `
						import task from '#tasuku';
						import { setTimeout } from 'node:timers/promises';

						await task('Success task', async () => {
							await setTimeout(50);
						});
						`,
					}, { tempDir });

					const result = await node(fixture.getPath('test.mjs'), {
						[name]: value,
					});
					expect(result.stderr).toBe('');
					expect(result.stdout).toContain('✔');

					// Verify no ANSI color codes present (only cursor/erase codes allowed)
					const ansiMatches = result.stdout.match(ansiRegex());
					const colorCodes = ansiMatches?.filter(code => !nonColorAnsiCodes.has(code));
					expect(colorCodes?.length ?? 0).toBe(0);
				}
			});

			test('FORCE_COLOR=1 enables colors', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Success task', async () => {
						await setTimeout(50);
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain(yoctocolors.green('✔'));
			});

			test('colors work with error state', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Error task', async ({ setError }) => {
						await setTimeout(50);
						setError('Something failed');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain(yoctocolors.red('✖'));
			});

			test('NO_COLOR removes all colors including warning', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Warning task', async ({ setWarning }) => {
						await setTimeout(50);
						setWarning('A warning');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					NO_COLOR: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain('⚠');

				// Verify no ANSI color codes present (only cursor/erase codes allowed)
				const ansiMatches = result.stdout.match(ansiRegex());
				const colorCodes = ansiMatches?.filter(code => !nonColorAnsiCodes.has(code));
				expect(colorCodes?.length ?? 0).toBe(0);
			});

			test('colors work with nested tasks', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent task', async ({ task }) => {
						await setTimeout(50);
						await task('Child task', async () => {
							await setTimeout(50);
						});
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'));
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain(yoctocolors.yellow('❯'));
				expect(result.stdout).toContain(yoctocolors.green('✔'));
			});

			test('NO_COLOR with nested tasks removes all colors', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent task', async ({ task }) => {
						await setTimeout(50);
						await task('Child task', async () => {
							await setTimeout(50);
						});
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					NO_COLOR: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toContain('❯');
				expect(result.stdout).toContain('✔');

				// Verify no ANSI color codes present (only cursor/erase codes allowed)
				const ansiMatches = result.stdout.match(ansiRegex());
				const colorCodes = ansiMatches?.filter(code => !nonColorAnsiCodes.has(code));
				expect(colorCodes?.length ?? 0).toBe(0);
			});
		});
	});
});
