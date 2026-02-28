import { describe, test, expect } from 'manten';
import { formatTaskLine } from '../../src/utils/format-task-line.ts';
import type { TaskObject, TasukuTheme } from '../../src/types.ts';

const mockTheme: TasukuTheme = {
	spinner: ['S0'],
	icons: {
		pending: 'P',
		success: 'OK',
		error: 'ERR',
		warning: 'WARN',
		parent: 'PAR',
		parentError: 'PERR',
	},
	colors: {
		dim: (text: string) => `[dim:${text}]`,
		secondary: (text: string) => `[sec:${text}]`,
	},
};

const createTask = (overrides: Partial<TaskObject> = {}): TaskObject => ({
	title: 'My Task',
	state: 'loading',
	children: [],
	...overrides,
});

describe('formatTaskLine', () => {
	test('basic: icon + title at depth 0', () => {
		const result = formatTaskLine(createTask(), '>', 0, mockTheme, 0);
		expect(result).toBe('> My Task');
	});

	test('depth 1 adds 2-space indent', () => {
		const result = formatTaskLine(createTask(), '>', 1, mockTheme, 0);
		expect(result).toBe('  > My Task');
	});

	test('depth 2 adds 4-space indent', () => {
		const result = formatTaskLine(createTask(), '>', 2, mockTheme, 0);
		expect(result).toBe('    > My Task');
	});

	test('status appends dim-wrapped brackets', () => {
		const task = createTask({ status: 'running' });
		const result = formatTaskLine(task, '>', 0, mockTheme, 0);
		expect(result).toBe('> My Task [dim:[running]]');
	});

	test('no status omits brackets', () => {
		const result = formatTaskLine(createTask(), '>', 0, mockTheme, 0);
		expect(result).not.toContain('[');
	});

	test('elapsedMs >= 1000 appends formatted time', () => {
		const task = createTask({ elapsedMs: 2500 });
		const result = formatTaskLine(task, '>', 0, mockTheme, 0);
		expect(result).toBe('> My Task [dim:(2s)]');
	});

	test('elapsedMs < 1000 does not append time', () => {
		const task = createTask({ elapsedMs: 999 });
		const result = formatTaskLine(task, '>', 0, mockTheme, 0);
		expect(result).toBe('> My Task');
	});

	test('no elapsedMs and no startedAt omits time', () => {
		const result = formatTaskLine(createTask(), '>', 0, mockTheme, 0);
		expect(result).not.toContain('(');
	});

	test('startedAt computes live elapsed time', () => {
		// Set startedAt to 5 seconds ago
		const task = createTask({ startedAt: Date.now() - 5000 });
		const result = formatTaskLine(task, '>', 0, mockTheme, 0);
		expect(result).toContain('[dim:(5s)]');
	});

	test('title callback receives text, state, and frame', () => {
		const calls: [string, string, number][] = [];
		const themeWithTitle: TasukuTheme = {
			...mockTheme,
			colors: {
				...mockTheme.colors,
				title: (text, state, frame) => {
					calls.push([text, state, frame]);
					return `[styled:${text}]`;
				},
			},
		};

		const task = createTask({
			title: 'Test',
			state: 'loading',
		});
		const result = formatTaskLine(task, '>', 0, themeWithTitle, 7);

		expect(calls).toEqual([['Test', 'loading', 7]]);
		expect(result).toBe('> [styled:Test]');
	});

	test('no title callback uses raw title', () => {
		const result = formatTaskLine(createTask({ title: 'Raw Title' }), '>', 0, mockTheme, 0);
		expect(result).toContain('Raw Title');
	});

	test('status and elapsed both present', () => {
		const task = createTask({
			status: 'step 2',
			elapsedMs: 3000,
		});
		const result = formatTaskLine(task, '>', 0, mockTheme, 0);
		expect(result).toBe('> My Task [dim:[step 2]] [dim:(3s)]');
	});
});
