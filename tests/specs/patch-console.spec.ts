import { describe, test, expect } from 'manten';
import { patchConsole } from '../../src/utils/patch-console.ts';

describe('patchConsole', () => {
	test('restoring first patcher does not break second patcher', () => {
		const output1: string[] = [];
		const output2: string[] = [];

		const restore1 = patchConsole((_stream, data) => { output1.push(data); });
		const restore2 = patchConsole((_stream, data) => { output2.push(data); });

		console.log('both');

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
});
