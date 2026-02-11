import { Writable } from 'node:stream';

/**
 * Intercept console methods so the renderer can coordinate output.
 *
 * The renderer uses ANSI cursor-save/restore to redraw the task UI in-place.
 * If user code calls console.log() while tasks are running, that output lands
 * in the middle of the render area, corrupting the display. By patching
 * console methods, we can clear the task UI first, write the console output,
 * then re-save the cursor position and redraw — keeping both the user's
 * output and the task UI intact.
 */

const consoleMethods = [
	'assert',
	'count',
	'countReset',
	'debug',
	'dir',
	'dirxml',
	'error',
	'group',
	'groupCollapsed',
	'groupEnd',
	'info',
	'log',
	'table',
	'time',
	'timeEnd',
	'timeLog',
	'trace',
	'warn',
] as const;

export const patchConsole = (
	callback: (stream: 'stdout' | 'stderr', data: string) => void,
): (() => void) => {
	const createStream = (name: 'stdout' | 'stderr') => new Writable({
		write(chunk, _encoding, done) {
			callback(name, String(chunk));
			done();
		},
	});

	const patched = new console.Console(createStream('stdout'), createStream('stderr'));

	const originals = new Map<string, unknown>();
	for (const method of consoleMethods) {
		originals.set(method, console[method]);
		// @ts-expect-error Console method overloads prevent direct assignment
		console[method] = patched[method];
	}

	return () => {
		for (const [method, function_] of originals) {
			// @ts-expect-error Restoring original console methods
			console[method] = function_;
		}
	};
};
