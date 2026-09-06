import { describe, test, expect } from 'manten';
import { createTerminal } from '../utils/terminal.ts';

describe('terminal test support', () => {
	test('retains blank rows and scrollback while omitting trailing empty rows', async () => {
		using terminal = createTerminal({
			cols: 8,
			rows: 2,
		});
		expect(terminal.screen).toBe('');
		await terminal.write('first\r\n\r\nlast\r\n');
		expect(terminal.screen).toBe('first\n\nlast');
	});

	test('awaited writes expose intermediate overwrites and erasure', async () => {
		using terminal = createTerminal({
			cols: 8,
			rows: 3,
		});
		await terminal.write('history\r\nrunning');
		expect(terminal.screen).toBe('history\nrunning');
		await terminal.write('\rOK');
		expect(terminal.screen).toBe('history\nOKnning');
		await terminal.write('\r\u001B[2Kdone');
		expect(terminal.screen).toBe('history\ndone');
	});

	test('cursor-down clamps at the bottom while a newline scrolls', async () => {
		using terminal = createTerminal({
			cols: 8,
			rows: 2,
		});
		await terminal.write('first\r\nlast');
		await terminal.write('\u001B[1B\r\u001B[2Kchanged');
		expect(terminal.screen).toBe('first\nchanged');
		await terminal.write('\r\nnext');
		expect(terminal.screen).toBe('first\nchanged\nnext');
	});
});
