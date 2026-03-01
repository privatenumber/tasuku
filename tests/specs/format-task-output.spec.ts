import { describe, test, expect } from 'manten';
import { formatTaskOutput } from '../../src/utils/format-task-output.ts';
import type { TaskObject, TasukuTheme } from '../../src/types.ts';

const mockTheme: TasukuTheme = {
	spinner: ['S0'],
	icons: {
		pending: 'P',
		success: 'OK',
		error: 'ERR',
		warning: 'WARN',
		skipped: 'SKIP',
		parent: 'PAR',
		parentError: 'PERR',
	},
	colors: {
		dim: (text: string) => text,
		secondary: (text: string) => `[${text}]`,
	},
};

const createTask = (overrides: Partial<TaskObject> = {}): TaskObject => ({
	title: 'test',
	state: 'success',
	children: [],
	...overrides,
});

describe('formatTaskOutput', () => {
	test('no output and no streamOutput returns empty string', () => {
		expect(formatTaskOutput(createTask(), 0, mockTheme)).toBe('');
	});

	test('single-line output gets arrow prefix', () => {
		const task = createTask({ output: 'hello' });
		const result = formatTaskOutput(task, 0, mockTheme);
		expect(result).toBe('  [\u2192 hello]\n');
	});

	test('multi-line output: first line gets arrow, rest do not', () => {
		const task = createTask({ output: 'line1\nline2\nline3' });
		const result = formatTaskOutput(task, 0, mockTheme);
		const lines = result.split('\n');
		// 3 content lines + trailing empty from final \n
		expect(lines[0]).toBe('  [\u2192 line1]');
		expect(lines[1]).toBe('  [line2]');
		expect(lines[2]).toBe('  [line3]');
	});

	test('depth 1 increases output indent', () => {
		const task = createTask({ output: 'hello' });
		const result = formatTaskOutput(task, 1, mockTheme);
		// depth 1 = '  '.repeat(1) + '  ' = 4 spaces
		expect(result).toBe('    [\u2192 hello]\n');
	});

	test('single-line streamOutput gets hook prefix', () => {
		const task = createTask({ streamOutput: 'stream line' });
		const result = formatTaskOutput(task, 0, mockTheme);
		expect(result).toBe('  \u23BF  [stream line]\n');
	});

	test('multi-line streamOutput: first gets hook, rest get continuation indent', () => {
		const task = createTask({ streamOutput: 'first\nsecond\nthird' });
		const result = formatTaskOutput(task, 0, mockTheme);
		const lines = result.split('\n');
		expect(lines[0]).toBe('  \u23BF  [first]');
		expect(lines[1]).toBe('     [second]');
		expect(lines[2]).toBe('     [third]');
	});

	test('streamTruncatedLines appends count indicator', () => {
		const task = createTask({
			streamOutput: 'visible',
			streamTruncatedLines: 5,
		});
		const result = formatTaskOutput(task, 0, mockTheme);
		expect(result).toContain('[(+ 5 lines)]');
	});

	test('streamTruncatedLines 0 omits indicator', () => {
		const task = createTask({
			streamOutput: 'visible',
			streamTruncatedLines: 0,
		});
		const result = formatTaskOutput(task, 0, mockTheme);
		expect(result).not.toContain('(+');
	});

	test('no streamTruncatedLines omits indicator', () => {
		const task = createTask({ streamOutput: 'visible' });
		const result = formatTaskOutput(task, 0, mockTheme);
		expect(result).not.toContain('(+');
	});

	test('output and streamOutput both present, output first', () => {
		const task = createTask({
			output: 'static',
			streamOutput: 'stream',
		});
		const result = formatTaskOutput(task, 0, mockTheme);
		const outputIndex = result.indexOf('\u2192 static');
		const streamIndex = result.indexOf('\u23BF');
		expect(outputIndex).toBeLessThan(streamIndex);
	});

	test('depth affects both output and stream indentation', () => {
		const task = createTask({
			output: 'out',
			streamOutput: 'str',
		});
		const atDepth0 = formatTaskOutput(task, 0, mockTheme);
		const atDepth2 = formatTaskOutput(task, 2, mockTheme);

		// depth 0: 2 spaces base, depth 2: 6 spaces base
		const lines0 = atDepth0.split('\n');
		const lines2 = atDepth2.split('\n');
		// Deeper depth should have more leading spaces
		const leadingSpaces = (line: string) => line.length - line.trimStart().length;
		expect(leadingSpaces(lines2[0])).toBeGreaterThan(leadingSpaces(lines0[0]));
	});

	test('error state uses theme error color', () => {
		const themeWithError: TasukuTheme = {
			...mockTheme,
			colors: {
				...mockTheme.colors,
				error: (text: string) => `{err:${text}}`,
			},
		};
		const task = createTask({
			output: 'broken',
			state: 'error',
		});
		const result = formatTaskOutput(task, 0, themeWithError);
		expect(result).toContain('{err:→ broken}');
	});

	test('warning state uses theme warning color', () => {
		const themeWithWarning: TasukuTheme = {
			...mockTheme,
			colors: {
				...mockTheme.colors,
				warning: (text: string) => `{warn:${text}}`,
			},
		};
		const task = createTask({
			output: 'careful',
			state: 'warning',
		});
		const result = formatTaskOutput(task, 0, themeWithWarning);
		expect(result).toContain('{warn:→ careful}');
	});

	test('error state falls back to secondary when theme has no error color', () => {
		const task = createTask({
			output: 'broken',
			state: 'error',
		});
		const result = formatTaskOutput(task, 0, mockTheme);
		expect(result).toContain('[→ broken]');
	});

	test('success state uses secondary even when error color is defined', () => {
		const themeWithError: TasukuTheme = {
			...mockTheme,
			colors: {
				...mockTheme.colors,
				error: (text: string) => `{err:${text}}`,
			},
		};
		const task = createTask({
			output: 'all good',
			state: 'success',
		});
		const result = formatTaskOutput(task, 0, themeWithError);
		expect(result).toContain('[→ all good]');
	});
});
