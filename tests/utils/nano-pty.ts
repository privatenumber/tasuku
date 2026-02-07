/**
 * Modern wrapper around node-pty.
 *
 * Modernizes node-pty's callback-based API into:
 * - EventEmitter with typed 'data' and 'exit' events
 * - AsyncIterable for streaming chunks
 * - Directly awaitable for final output + exit code
 * - Accumulated `.output` getter (lazy join)
 * - AbortSignal support for timeout and cancellation
 * - AsyncDisposable for `await using`
 */
import { EventEmitter, on } from 'node:events';
import { spawn, type IPtyForkOptions } from 'node-pty';

export type PtyResult = {
	output: string;
	exitCode: number;
};

type PtyEvents = {
	data: [chunk: string];
	exit: [exitCode: number];
};

export type PtyProcess = EventEmitter<PtyEvents>
	& AsyncIterable<string> & {
		readonly pid: number;
		readonly output: string;
		then: Promise<PtyResult>['then'];
		resize: (cols: number, rows: number) => void;
		kill: (signal?: string) => void;
		[Symbol.asyncDispose]: () => Promise<void>;
	};

export const nanoPty = (
	file: string,
	args: string[],
	spawnOptions: IPtyForkOptions,
	options: {
		signal?: AbortSignal;
		timeout?: number;
	} = {},
): PtyProcess => {
	const { timeout = 30_000, signal: userSignal } = options;

	// Compose abort signals: user cancellation + timeout
	const signals: AbortSignal[] = [];
	if (userSignal) {
		signals.push(userSignal);
	}
	if (timeout) {
		signals.push(AbortSignal.timeout(timeout));
	}
	const signal = signals.length > 0
		? (signals.length === 1 ? signals[0] : AbortSignal.any(signals))
		: undefined;

	const ptyProcess = spawn(file, args, spawnOptions);

	// eslint-disable-next-line unicorn/prefer-event-target
	const emitter = new EventEmitter<PtyEvents>() as PtyProcess;
	const chunks: string[] = [];
	let resolve!: (value: PtyResult) => void;
	let reject!: (reason: unknown) => void;
	const promise = new Promise<PtyResult>((_resolve, _reject) => {
		resolve = _resolve;
		reject = _reject;
	});

	let settled = false;

	const safeKill = (sig?: string) => {
		try { ptyProcess.kill(sig); } catch {}
	};

	const cleanup = () => {
		if (settled) {
			return;
		}
		settled = true;
		signal?.removeEventListener('abort', onAbort);
	};

	const onAbort = () => safeKill();

	if (signal?.aborted) {
		onAbort();
	} else {
		signal?.addEventListener('abort', onAbort, { once: true });
	}

	ptyProcess.onData((data) => {
		chunks.push(data);
		emitter.emit('data', data);
	});

	ptyProcess.onExit(({ exitCode }) => {
		cleanup();
		emitter.emit('exit', exitCode);

		if (signal?.aborted) {
			reject(signal.reason ?? new Error('PTY aborted'));
		} else {
			resolve({
				output: emitter.output,
				exitCode,
			});
		}
	});

	// output must use defineProperty — Object.assign snapshots getters
	Object.defineProperty(emitter, 'output', {
		get: () => chunks.join(''),
	});

	return Object.assign(emitter, {
		pid: ptyProcess.pid,
		// eslint-disable-next-line unicorn/no-thenable
		then: promise.then.bind(promise),

		resize: (cols: number, rows: number) => {
			try { ptyProcess.resize(cols, rows); } catch {}
		},

		kill: safeKill,

		async* [Symbol.asyncIterator]() {
			const ac = new AbortController();
			const exitHandler = () => ac.abort();

			emitter.once('exit', exitHandler);

			try {
				for await (const [chunk] of on(emitter, 'data', { signal: ac.signal })) {
					yield chunk as string;
				}
			} catch (error) {
				if (!ac.signal.aborted) {
					throw error;
				}
			} finally {
				emitter.off('exit', exitHandler);
			}
		},

		[Symbol.asyncDispose]: async () => {
			safeKill();
			const safetyValve = new Promise<void>(
				(_resolve) => { setTimeout(_resolve, 2000); },
			);
			await Promise.race([promise.catch(() => {}), safetyValve]);
		},
	});
};
