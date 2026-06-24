import { describe, test, expect } from 'manten';
import { createFixture } from 'fs-fixture';
import ansis from 'ansis';
import { node } from '../utils/node.ts';
import { tempDir } from '../utils/temp-dir.ts';

describe('createTasuku', () => {
	test('default export works with the pinned renderer', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku';

			await task('Default export', async () => {});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain(ansis.green('✔'));
		expect(result.stderr).toContain('Default export');
	});

	test('inline entry point works with the inline renderer', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import task from '#tasuku/inline';

			await task('Inline export', async () => {});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');

		expect(result.stderr).toContain('Inline export');
	});

	test('createTasuku factory accepts a renderer + outputStream', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { createTasuku, pinned } from '#tasuku/create';

			// Force output to stdout so the assertion can pick it up there.
			const task = createTasuku({
				renderer: pinned,
				outputStream: process.stdout,
			});

			await task('Routed to stdout', async () => {});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		// Task UI should now be on stdout, not stderr
		expect(result.stdout).toContain('Routed to stdout');
		expect(result.stderr).toBe('');
	});

	test('createTasuku without outputStream defaults to stderr', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { createTasuku, pinned } from '#tasuku/create';

			const task = createTasuku({ renderer: pinned });

			await task('Default stream', async () => {});
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toBe('');
		expect(result.stderr).toContain('Default stream');
	});

	test('independent instances do not interfere', async () => {
		await using fixture = await createFixture({
			'test.mjs': `
			import { createTasuku, pinned } from '#tasuku/create';

			const taskA = createTasuku({ renderer: pinned });
			const taskB = createTasuku({ renderer: pinned });

			const [a, b] = await Promise.all([
				taskA('Instance A', async () => 'a'),
				taskB('Instance B', async () => 'b'),
			]);

			console.log('result:', a, b);
			`,
		}, { tempDir });

		const result = await node(fixture.getPath('test.mjs'));
		expect(result.stdout).toContain('result: a b');
		expect(result.stderr).toContain('Instance A');
		expect(result.stderr).toContain('Instance B');
	});
});
