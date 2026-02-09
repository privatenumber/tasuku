import { testSuite, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansiEscapes from 'ansi-escapes';
import ansis from 'ansis';
import { node } from '../utils/node.js';
import { tempDir } from '../utils/temp-dir.js';

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

				// Should NOT contain ANSI save/restore cursor codes
				expect(result.stdout).not.toContain(ansiEscapes.cursorRestorePosition);
				expect(result.stdout).not.toContain(ansiEscapes.eraseDown);
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
				expect(result.stdout).toContain(ansiEscapes.cursorRestorePosition);
				expect(result.stdout).toContain(ansiEscapes.eraseDown);
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

				expect(result.stdout).toContain(ansis.green('✔'));
				expect(result.stdout).toContain('Task');
			});

			test('CI=1 produces clean append-only output', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Simple task', async () => {
						await setTimeout(100);
					});

					await task('Task with nested', async ({ task }) => {
						await setTimeout(50);
						await task('Nested task', async () => {
							await setTimeout(50);
						});
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toBe(
					`${ansis.green('✔')} Simple task\n`
					+ `${ansis.yellow('❯')} Task with nested\n`
					+ `  ${ansis.green('✔')} Nested task`,
				);
			});

			test('CI=1 shows error states correctly', async () => {
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

				const result = await node(fixture.getPath('test.mjs'), {
					CI: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toBe(
					`${ansis.red('✖')} Error task\n`
					+ `  ${ansis.gray('→ Something failed')}`,
				);
			});

			test('CI=1 shows warning states correctly', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Warning task', async ({ setWarning }) => {
						await setTimeout(50);
						setWarning('Warning message');
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toBe(
					`${ansis.yellow('⚠')} Warning task\n`
					+ `  ${ansis.gray('→ Warning message')}`,
				);
			});

			test('CI=1 handles nested tasks correctly', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Parent task', async ({ task }) => {
						await setTimeout(50);
						await task('Child 1', async () => {
							await setTimeout(50);
						});
						await task('Child 2', async ({ setWarning }) => {
							await setTimeout(50);
							setWarning('Child warning');
						});
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toBe(
					`${ansis.yellow('❯')} Parent task\n`
					+ `  ${ansis.green('✔')} Child 1\n`
					+ `  ${ansis.yellow('⚠')} Child 2\n`
					+ `    ${ansis.gray('→ Child warning')}`,
				);
			});

			test('CI=1 with setTitle shows updated title', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Initial title', async ({ setTitle }) => {
						await setTimeout(50);
						setTitle('Updated title');
						await setTimeout(50);
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toBe(
					`${ansis.green('✔')} Updated title`,
				);
			});

			test('CI=1 with setStatus shows status', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with status', async ({ setStatus }) => {
						setStatus('processing...');
						await setTimeout(50);
						setStatus('finalizing...');
						await setTimeout(50);
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toBe(
					`${ansis.green('✔')} Task with status ${ansis.dim('[finalizing...]')}`,
				);
			});

			test('CI=1 with setOutput shows output', async () => {
				await using fixture = await createFixture({
					'test.mjs': `
					import task from '#tasuku';
					import { setTimeout } from 'node:timers/promises';

					await task('Task with output', async ({ setOutput }) => {
						setOutput('Some output text');
						await setTimeout(50);
					});
					`,
				}, { tempDir });

				const result = await node(fixture.getPath('test.mjs'), {
					CI: '1',
				});
				expect(result.stderr).toBe('');

				expect(result.stdout).toBe(
					`${ansis.green('✔')} Task with output\n`
					+ `  ${ansis.gray('→ Some output text')}`,
				);
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

					// Verify no ANSI color codes present (only cursor/erase codes allowed)
					expect(result.stdout).toBe(
						`${ansiEscapes.cursorSavePosition}⠋ Success task\n`
						+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}✔ Success task`,
					);
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

				expect(result.stdout).toBe(
					`${ansiEscapes.cursorSavePosition}${ansis.yellow('⠋')} Success task\n`
					+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.green('✔')} Success task`,
				);
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

				expect(result.stdout).toBe(
					`${ansiEscapes.cursorSavePosition}${ansis.yellow('⠋')} Error task\n`
					+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.red('✖')} Error task\n`
					+ `  ${ansis.gray('→ Something failed')}`,
				);
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

				expect(result.stdout).toBe(
					`${ansiEscapes.cursorSavePosition}⠋ Warning task\n`
					+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}⚠ Warning task\n`
					+ '  → A warning',
				);
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

				expect(result.stdout).toBe(
					`${ansiEscapes.cursorSavePosition}${ansis.yellow('⠋')} Parent task\n`
					+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.yellow('❯')} Parent task\n`
					+ `  ${ansis.yellow('⠋')} Child task\n`
					+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}${ansis.yellow('❯')} Parent task\n`
					+ `  ${ansis.green('✔')} Child task`,
				);
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

				expect(result.stdout).toBe(
					`${ansiEscapes.cursorSavePosition}⠋ Parent task\n`
					+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}❯ Parent task\n`
					+ '  ⠋ Child task\n'
					+ `${ansiEscapes.cursorRestorePosition}${ansiEscapes.eraseDown}❯ Parent task\n`
					+ '  ✔ Child task',
				);
			});
		});
	});
});
