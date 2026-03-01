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
 *
 * Multiple renderers can patch simultaneously. A callback stack ensures
 * the most recently registered callback receives output, and restoring
 * one renderer does not break another. The original console methods are
 * only restored when the last callback is removed.
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

type ConsoleCallback = (stream: 'stdout' | 'stderr', data: string) => void;

const callbackStack: ConsoleCallback[] = [];
const originals = new Map<string, unknown>();

const installPatch = (callback: ConsoleCallback) => {
	const createStream = (name: 'stdout' | 'stderr') => new Writable({
		write(chunk, _encoding, done) {
			callback(name, String(chunk));
			done();
		},
	});

	const patched = new console.Console(createStream('stdout'), createStream('stderr'));

	for (const method of consoleMethods) {
		// @ts-expect-error Console method overloads prevent direct assignment
		console[method] = patched[method];
	}
};

export const patchConsole = (
	callback: ConsoleCallback,
): (() => void) => {
	// Save originals on first patch
	if (callbackStack.length === 0) {
		for (const method of consoleMethods) {
			originals.set(method, console[method]);
		}
	}

	callbackStack.push(callback);
	installPatch(callback);

	return () => {
		const index = callbackStack.indexOf(callback);
		if (index === -1) {
			return;
		}
		callbackStack.splice(index, 1);

		if (callbackStack.length === 0) {
			// Last callback removed — restore originals
			for (const [method, function_] of originals) {
				// @ts-expect-error Restoring original console methods
				console[method] = function_;
			}
			originals.clear();
		} else {
			// Re-install the top of the stack
			installPatch(callbackStack.at(-1)!);
		}
	};
};
