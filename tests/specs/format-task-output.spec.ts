import { describe, test, expect } from 'manten';
import {
	gray, red, yellow,
} from 'ansis';
import { formatTaskOutput } from '../../src/utils/format-task-output.ts';
import type { TaskObject } from '../../src/types.ts';

const createTask = (overrides: Partial<TaskObject> = {}): TaskObject => ({
	title: 'test',
	state: 'success',
	children: [],
	...overrides,
});

describe('formatTaskOutput', () => {
	test('no output and no streamOutput returns empty string', () => {
		expect(formatTaskOutput(createTask(), 0)).toBe('');
	});

	test('single-line output gets arrow prefix', () => {
		const task = createTask({ output: 'hello' });
		const result = formatTaskOutput(task, 0);
		expect(result).toBe(`  ${gray('→')} ${gray('hello')}\n`);
	});

	test('multi-line output: continuation lines align with first line text', () => {
		const task = createTask({ output: 'line1\nline2\nline3' });
		const result = formatTaskOutput(task, 0);
		const lines = result.split('\n');
		expect(lines[0]).toBe(`  ${gray('→')} ${gray('line1')}`);
		expect(lines[1]).toBe(`    ${gray('line2')}`);
		expect(lines[2]).toBe(`    ${gray('line3')}`);
	});

	test('multi-line output: empty lines get continuation padding', () => {
		const task = createTask({ output: 'line1\n\nline3' });
		const result = formatTaskOutput(task, 0);
		const lines = result.split('\n');
		expect(lines[0]).toBe(`  ${gray('→')} ${gray('line1')}`);
		expect(lines[1]).toBe(`    ${gray('')}`);
		expect(lines[2]).toBe(`    ${gray('line3')}`);
	});

	test('depth 1 increases output indent', () => {
		const task = createTask({ output: 'hello' });
		const result = formatTaskOutput(task, 1);
		// depth 1 = '  '.repeat(1) + '  ' = 4 spaces
		expect(result).toBe(`    ${gray('→')} ${gray('hello')}\n`);
	});

	test('single-line streamOutput gets hook prefix', () => {
		const task = createTask({ streamOutput: 'stream line' });
		const result = formatTaskOutput(task, 0);
		expect(result).toBe(`  ⎿  ${gray('stream line')}\n`);
	});

	test('multi-line streamOutput: first gets hook, rest get continuation indent', () => {
		const task = createTask({ streamOutput: 'first\nsecond\nthird' });
		const result = formatTaskOutput(task, 0);
		const lines = result.split('\n');
		expect(lines[0]).toBe(`  ⎿  ${gray('first')}`);
		expect(lines[1]).toBe(`     ${gray('second')}`);
		expect(lines[2]).toBe(`     ${gray('third')}`);
	});

	test('streamTruncatedLines appends count indicator', () => {
		const task = createTask({
			streamOutput: 'visible',
			streamTruncatedLines: 5,
		});
		const result = formatTaskOutput(task, 0);
		expect(result).toContain(gray('(+ 5 lines)'));
	});

	test('streamTruncatedLines 0 omits indicator', () => {
		const task = createTask({
			streamOutput: 'visible',
			streamTruncatedLines: 0,
		});
		const result = formatTaskOutput(task, 0);
		expect(result).not.toContain('(+');
	});

	test('no streamTruncatedLines omits indicator', () => {
		const task = createTask({ streamOutput: 'visible' });
		const result = formatTaskOutput(task, 0);
		expect(result).not.toContain('(+');
	});

	test('output and streamOutput both present, output first', () => {
		const task = createTask({
			output: 'static',
			streamOutput: 'stream',
		});
		const result = formatTaskOutput(task, 0);
		const outputIndex = result.indexOf('→');
		const streamIndex = result.indexOf('⎿');
		expect(outputIndex).toBeLessThan(streamIndex);
	});

	test('depth affects both output and stream indentation', () => {
		const task = createTask({
			output: 'out',
			streamOutput: 'str',
		});
		const atDepth0 = formatTaskOutput(task, 0);
		const atDepth2 = formatTaskOutput(task, 2);

		// depth 0: 2 spaces base, depth 2: 6 spaces base
		const lines0 = atDepth0.split('\n');
		const lines2 = atDepth2.split('\n');
		// Deeper depth should have more leading spaces
		const leadingSpaces = (line: string) => line.length - line.trimStart().length;
		expect(leadingSpaces(lines2[0])).toBeGreaterThan(leadingSpaces(lines0[0]));
	});

	test('error state colors output red', () => {
		const task = createTask({
			output: 'broken',
			state: 'error',
		});
		const result = formatTaskOutput(task, 0);
		expect(result).toContain(red('broken'));
	});

	test('warning state colors output yellow', () => {
		const task = createTask({
			output: 'careful',
			state: 'warning',
		});
		const result = formatTaskOutput(task, 0);
		expect(result).toContain(yellow('careful'));
	});

	test('success state colors output gray (secondary)', () => {
		const task = createTask({
			output: 'all good',
			state: 'success',
		});
		const result = formatTaskOutput(task, 0);
		expect(result).toContain(gray('all good'));
	});
});
