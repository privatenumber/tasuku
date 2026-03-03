import { describe, test, expect } from 'manten';
import { checkRowOwnership, getTerminalGrid } from '../utils/ansi-terminal.ts';

describe('checkRowOwnership', () => {
	test('simple append — each task on its own row', () => {
		const output = 'Task A\nTask B\nTask C\n';
		const check = checkRowOwnership(output, ['Task A', 'Task B', 'Task C']);
		expect(check.violation).toBeUndefined();
	});

	test('detects task overwriting another row', () => {
		// Task A on row 0, Task B on row 1, then cursor up 2 overwrites row 0 with Task B
		const output = 'Task A\nTask B\n\u001B[2A\u001B[2KTask B';
		const check = checkRowOwnership(output, ['Task A', 'Task B']);
		expect(check.violation).toContain('Task A');
		expect(check.violation).toContain('Task B');
	});

	test('cursor up/down preserves row ownership', () => {
		// Write two tasks, cursor up to update Task A in place, cursor back down
		const output = 'Task A\nTask B\n\u001B[2A\u001B[2KTask A updated\u001B[2B';
		const check = checkRowOwnership(output, ['Task A', 'Task B']);
		expect(check.violation).toBeUndefined();
	});

	test('erase then rewrite same task does not violate ownership', () => {
		// Erase Task A's row and rewrite with updated content
		const output = 'Task A\nTask B\n\u001B[2A\u001B[2KTask A v2\u001B[2B';
		const check = checkRowOwnership(output, ['Task A', 'Task B']);
		expect(check.violation).toBeUndefined();
	});

	test('erased task without rewrite is reported missing', () => {
		const output = 'Task A\nTask B\n\u001B[2A\u001B[2K\u001B[2B';
		const check = checkRowOwnership(output, ['Task A', 'Task B']);
		expect(check.violation).toContain('Task A');
		expect(check.violation).toContain('not found');
	});

	test('insert line shifts ownership down', () => {
		// Task A on row 0, Task B on row 1, cursor up 2, insert line pushes B down
		const output = 'Task A\nTask B\n\u001B[2A\u001B[LTask C\n';
		const check = checkRowOwnership(output, ['Task A', 'Task B', 'Task C']);
		expect(check.violation).toBeUndefined();
	});

	test('carriage return stays on same row', () => {
		const output = 'Task A\r\u001B[2KTask A updated\nTask B\n';
		const check = checkRowOwnership(output, ['Task A', 'Task B']);
		expect(check.violation).toBeUndefined();
	});

	test('missing task in output is a violation', () => {
		const output = 'Task A\nTask B\n';
		const check = checkRowOwnership(output, ['Task A', 'Task B', 'Task C']);
		expect(check.violation).toContain('Task C');
		expect(check.violation).toContain('not found');
	});

	test('inline renderer update pattern — cursor up, erase, write, cursor down', () => {
		// Simulates inline renderer updating Task A spinner, then Task B spinner
		const output = [
			'Task A loading\n',
			'Task B loading\n',
			// Update Task A: up 2, erase, write, down 2
			'\u001B[2A\r\u001B[2KTask A done\u001B[2B\r',
			// Update Task B: up 1, erase, write, down 1
			'\u001B[1A\r\u001B[2KTask B done\u001B[1B\r',
		].join('');
		const check = checkRowOwnership(output, ['Task A', 'Task B']);
		expect(check.violation).toBeUndefined();
	});
});

describe('getTerminalGrid', () => {
	test('simple newline-separated output', () => {
		const grid = getTerminalGrid('line 1\nline 2\nline 3\n');
		expect(grid).toEqual(['line 1', 'line 2', 'line 3']);
	});

	test('cursor up + erase + rewrite produces updated grid', () => {
		const output = 'Task A loading\nTask B loading\n'
			+ '\u001B[2A\r\u001B[2KTask A done\u001B[2B\r'
			+ '\u001B[1A\r\u001B[2KTask B done\u001B[1B\r';
		const grid = getTerminalGrid(output);
		expect(grid).toEqual(['Task A done', 'Task B done']);
	});

	test('strips ANSI color codes from grid content', () => {
		const grid = getTerminalGrid('\u001B[32m✔\u001B[39m Success\n\u001B[31m✖\u001B[39m Error\n');
		expect(grid).toEqual(['✔ Success', '✖ Error']);
	});

	test('insert line shifts content down', () => {
		const output = 'Row 0\nRow 1\n'
			+ '\u001B[2A\u001B[LInserted\n';
		const grid = getTerminalGrid(output);
		expect(grid[0]).toBe('Inserted');
		expect(grid[1]).toBe('Row 0');
	});

	test('trims trailing empty rows', () => {
		const grid = getTerminalGrid('content\n\n\n');
		expect(grid).toEqual(['content']);
	});
});
