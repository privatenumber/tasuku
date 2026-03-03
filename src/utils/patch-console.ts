import { Writable } from 'node:stream';

/**
 * Intercept console methods so renderers can coordinate output.
 *
 * The renderer uses ANSI cursor-save/restore to redraw the task UI in-place.
 * If user code calls console.log() while tasks are running, that output lands
 * in the middle of the render area, corrupting the display. By patching
 * console methods, we can clear the task UI first, write the console output,
 * then re-save the cursor position and redraw — keeping both the user's
 * output and the task UI intact.
 *
 * Multiple renderers can patch simultaneously. On each console write:
 * 1. All "before" hooks fire (e.g. pinned renderer clears its render area)
 * 2. The data is written to the original stream (once)
 * 3. All "after" hooks fire (e.g. renderers update offsets and redraw)
 *
 * The original console methods are only restored when the last hook is removed.
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

export type ConsoleHooks = {
	before?: (stream: 'stdout' | 'stderr', data: string) => void;
	after?: (stream: 'stdout' | 'stderr', data: string) => void;
};

const hookSet: Set<ConsoleHooks> = new Set();
const originals = new Map<string, unknown>();

// Saved references to the real stream write methods, captured before any
// monkey-patching (e.g. by registerStreamListener in inline.ts).
// Using these ensures console output is written exactly once, bypassing
// any stream-level interception that would cause double offset counting.
let originalStdoutWrite: typeof process.stdout.write | undefined;
let originalStderrWrite: typeof process.stderr.write | undefined;

const handleWrite = (stream: 'stdout' | 'stderr', data: string) => {
	// Before: let renderers prepare (e.g. clear render area)
	for (const hooks of hookSet) {
		try { hooks.before?.(stream, data); } catch {}
	}

	// Write to the real stream, bypassing any monkey-patches
	const write = stream === 'stderr' ? originalStderrWrite! : originalStdoutWrite!;
	write(data);

	// After: let renderers react (e.g. update offsets, redraw)
	for (const hooks of hookSet) {
		try { hooks.after?.(stream, data); } catch {}
	}
};

const installPatch = () => {
	const createStream = (name: 'stdout' | 'stderr') => new Writable({
		write: (chunk: Buffer, _encoding: string, done: () => void) => {
			handleWrite(name, String(chunk));
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
	hooks: ConsoleHooks,
): (() => void) => {
	// Save originals on first patch
	if (hookSet.size === 0) {
		for (const method of consoleMethods) {
			originals.set(method, console[method]);
		}
		originalStdoutWrite = process.stdout.write.bind(process.stdout);
		originalStderrWrite = process.stderr.write.bind(process.stderr);
		installPatch();
	}

	hookSet.add(hooks);

	return () => {
		hookSet.delete(hooks);

		if (hookSet.size === 0) {
			for (const [method, function_] of originals) {
				// @ts-expect-error Restoring original console methods
				console[method] = function_;
			}
			originals.clear();
			originalStdoutWrite = undefined;
			originalStderrWrite = undefined;
		}
	};
};
