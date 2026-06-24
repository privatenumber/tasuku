import { setTimeout } from 'node:timers/promises';
import { Writable } from 'node:stream';
import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import { createTasuku, pinned } from '#tasuku/create';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

const nullStream = new Writable({
	write: (_, __, callback) => { callback(); },
}) as NodeJS.WriteStream;

describe('cross-instance nesting', () => {
	describe('same renderer type', () => {
		test('child from different instance renders as nested under parent', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, pinned } from '#tasuku/create';

				const taskA = createTasuku({ renderer: pinned });
				const taskB = createTasuku({ renderer: pinned });

				await taskA('Parent', async () => {
					await taskB('Child', async () => {});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Parent should show pointer icon (has children), not success icon
			expect(result.stderr).toContain('❯');
			expect(result.stderr).toContain('Parent');

			// Child should be indented under parent
			expect(result.stderr).toContain('Child');
		});

		test('cross-instance abort propagates from parent to child', async () => {
			const taskA = createTasuku({
				renderer: pinned,
				outputStream: nullStream,
			});

			const taskB = createTasuku({
				renderer: pinned,
				outputStream: nullStream,
			});

			let childSignal: AbortSignal | undefined;

			await expect(
				taskA('parent', async () => {
					// Fire-and-forget child from different instance
					taskB('child', async ({ signal }) => {
						childSignal = signal;
						await setTimeout(5000, undefined, { signal });
					}).catch(() => {});

					throw new Error('parent failed');
				}),
			).rejects.toThrow('parent failed');

			expect(childSignal).toBeInstanceOf(AbortSignal);
			expect(childSignal!.aborted).toBe(true);
		});
	});

	describe('different renderer types', () => {
		test('inline child nests under pinned parent', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, pinned, inline } from '#tasuku/create';

				const pinnedTask = createTasuku({ renderer: pinned });
				const inlineTask = createTasuku({ renderer: inline });

				await pinnedTask('Parent', async () => {
					await inlineTask('Child', async () => {});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Parent should show pointer icon (has children)
			expect(result.stderr).toContain('❯');
			expect(result.stderr).toContain('Parent');

			// Child should render as nested under parent
			expect(result.stderr).toContain('Child');
		});

		test('pinned child nests under inline parent', async () => {
			await using fixture = await createFixture({
				'test.mjs': `
				import { createTasuku, pinned, inline } from '#tasuku/create';

				const inlineTask = createTasuku({ renderer: inline });
				const pinnedTask = createTasuku({ renderer: pinned });

				await inlineTask('Parent', async () => {
					await pinnedTask('Child', async () => {});
				});
				`,
			}, { tempDir });

			const result = await node(fixture.getPath('test.mjs'));
			expect(result.stdout).toBe('');

			// Should show both tasks with nesting structure
			expect(result.stderr).toContain('Parent');
			expect(result.stderr).toContain('Child');

			// Parent before child in output
			const parentIndex = result.stderr.indexOf('Parent');
			const childIndex = result.stderr.indexOf('Child');
			expect(parentIndex).toBeLessThan(childIndex);
		});
	});

	describe('clear', () => {
		test('clearing cross-instance child does not destroy parent renderer', async () => {
			const taskA = createTasuku({
				renderer: pinned,
				outputStream: nullStream,
			});

			const taskB = createTasuku({
				renderer: pinned,
				outputStream: nullStream,
			});

			await taskA('Parent', async () => {
				const child = taskB('Child', async () => 'done');
				const result = await child;
				expect(result).toBe('done');
				child.clear();
			});
		});
	});

	describe('independent root tasks stay independent', () => {
		test('top-level tasks from different instances do not interfere', async () => {
			const taskA = createTasuku({
				renderer: pinned,
				outputStream: nullStream,
			});

			const taskB = createTasuku({
				renderer: pinned,
				outputStream: nullStream,
			});

			// Both at top level (not nested) — should stay independent
			const [resultA, resultB] = await Promise.all([
				taskA('Task A', async () => 'a'),
				taskB('Task B', async () => 'b'),
			]);

			expect(resultA).toBe('a');
			expect(resultB).toBe('b');
		});
	});
});
