import { describe, test, expect } from 'manten';
import { dim } from 'ansis';
import { formatTaskLine } from '../../src/utils/format-task-line.ts';
import type { TaskObject } from '../../src/types.ts';

const createTask = (overrides: Partial<TaskObject> = {}): TaskObject => ({
	title: 'My Task',
	state: 'loading',
	children: [],
	...overrides,
});

describe('formatTaskLine', () => {
	test('basic: icon + title at depth 0', () => {
		const result = formatTaskLine(createTask(), '>', 0);
		expect(result).toBe('> My Task');
	});

	test('depth 1 adds 2-space indent', () => {
		const result = formatTaskLine(createTask(), '>', 1);
		expect(result).toBe('  > My Task');
	});

	test('depth 2 adds 4-space indent', () => {
		const result = formatTaskLine(createTask(), '>', 2);
		expect(result).toBe('    > My Task');
	});

	test('status appends dim-wrapped brackets', () => {
		const task = createTask({ status: 'running' });
		const result = formatTaskLine(task, '>', 0);
		expect(result).toBe(`> My Task ${dim('[running]')}`);
	});

	test('no status omits brackets', () => {
		const result = formatTaskLine(createTask(), '>', 0);
		expect(result).not.toContain('[');
	});

	test('elapsedMs >= 1000 appends formatted time', () => {
		const task = createTask({ elapsedMs: 2500 });
		const result = formatTaskLine(task, '>', 0);
		expect(result).toBe(`> My Task ${dim('(2s)')}`);
	});

	test('elapsedMs < 1000 does not append time', () => {
		const task = createTask({ elapsedMs: 999 });
		const result = formatTaskLine(task, '>', 0);
		expect(result).toBe('> My Task');
	});

	test('no elapsedMs and no startedAt omits time', () => {
		const result = formatTaskLine(createTask(), '>', 0);
		expect(result).not.toContain('(');
	});

	test('startedAt computes live elapsed time', () => {
		// Set startedAt to 5 seconds ago
		const task = createTask({ startedAt: Date.now() - 5000 });
		const result = formatTaskLine(task, '>', 0);
		expect(result).toContain(dim('(5s)'));
	});

	test('status and elapsed both present', () => {
		const task = createTask({
			status: 'step 2',
			elapsedMs: 3000,
		});
		const result = formatTaskLine(task, '>', 0);
		expect(result).toBe(`> My Task ${dim('[step 2]')} ${dim('(3s)')}`);
	});
});
