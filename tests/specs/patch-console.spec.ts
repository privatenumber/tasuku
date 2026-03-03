import { describe, test, expect } from 'manten';
import { patchConsole } from '../../src/utils/patch-console.ts';

describe('patchConsole', () => {
	test('restoring first hook does not break second hook', () => {
		const output1: string[] = [];
		const output2: string[] = [];

		const restore1 = patchConsole({ after: (_stream, data) => { output1.push(data); } });
		const restore2 = patchConsole({ after: (_stream, data) => { output2.push(data); } });

		console.log('both');
		expect(output1).toContain('both\n');
		expect(output2).toContain('both\n');

		// Destroy first — second should still work
		restore1();
		console.log('after restore1');
		expect(output2).toContain('after restore1\n');

		// Destroy second — console should be fully restored
		restore2();

		const beforeLength1 = output1.length;
		const beforeLength2 = output2.length;
		console.log('original');
		expect(output1.length).toBe(beforeLength1);
		expect(output2.length).toBe(beforeLength2);
	});

	test('both hooks receive every console write', () => {
		const calls1: string[] = [];
		const calls2: string[] = [];

		const restore1 = patchConsole({ after: (_stream, data) => { calls1.push(data); } });
		const restore2 = patchConsole({ after: (_stream, data) => { calls2.push(data); } });

		console.log('test');

		expect(calls1).toEqual(['test\n']);
		expect(calls2).toEqual(['test\n']);

		restore1();
		restore2();
	});

	test('throwing before hook does not prevent write or after hooks', () => {
		const afterCalls: string[] = [];

		const before1 = () => { throw new Error('before hook crashed'); };
		const after1 = (_stream: string, data: string) => { afterCalls.push(`hook1:${data}`); };
		const after2 = (_stream: string, data: string) => { afterCalls.push(`hook2:${data}`); };

		const restore1 = patchConsole({
			before: before1,
			after: after1,
		});
		const restore2 = patchConsole({ after: after2 });

		// Should not throw — the before hook error should be caught
		console.log('survives');

		// After hooks from both should still fire
		expect(afterCalls).toContain('hook1:survives\n');
		expect(afterCalls).toContain('hook2:survives\n');

		restore1();
		restore2();
	});
});
