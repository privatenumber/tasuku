import { nanoPty, type PtyProcess as RawPtyProcess, type PtyResult as RawPtyResult } from './nano-pty.js';
import { createTerminal } from './terminal.js';

export type PtyResult = RawPtyResult & { screen: string };
export type PtyProcess = Omit<RawPtyProcess, 'then' | 'resize'> & {
	then: Promise<PtyResult>['then'];
	getScreen: () => Promise<string>;
	resize: (cols: number, rows: number) => Promise<void>;
};

/**
 * Spawns a Node.js process in a pseudo-TTY.
 * `screen` contains physical terminal rows and retained scrollback. It removes
 * each row's trailing spaces and trailing empty rows, without adding a newline.
 *
 * Simple:
 *   const { rawOutput, screen, exitCode } = await nodePty(script);
 *
 * Interactive:
 *   await using pty = nodePty(script, { cols: 80, rows: 10 });
 *   for await (const _ of pty) {
 *     if (pty.rawOutput.includes('DONE')) break;
 *   }
 *   const loadingScreen = await pty.getScreen();
 *   await pty.resize(80, 40);
 *   const { rawOutput, screen, exitCode } = await pty;
 */
export const nodePty = (
	scriptPath: string,
	options?: {
		cols?: number;
		rows?: number;
		env?: Record<string, string>;
	},
): PtyProcess => {
	const dimensions = {
		cols: options?.cols ?? 80,
		rows: options?.rows ?? 24,
	};
	const subprocess = nanoPty(
		process.execPath,
		[...process.execArgv, scriptPath],
		{
			name: 'xterm-256color',
			...dimensions,
			cwd: process.cwd(),
			env: {
				...process.env,
				FORCE_COLOR: '1',
				COLORTERM: 'truecolor',
				TERM: 'xterm-256color',
				CI: '',
				GITHUB_ACTIONS: '',
				CONTINUOUS_INTEGRATION: '',
				BUILD_NUMBER: '',
				...options?.env,
			},
		},
	);
	const terminal = createTerminal(dimensions);
	const writeOutput = terminal.terminal.write.bind(terminal.terminal);
	subprocess.on('data', writeOutput);
	let exited = false;
	subprocess.once('exit', () => {
		exited = true;
	});

	// Capture raw completion before replacing the thenable. An empty write drains
	// earlier output on success or rejection, before snapshots and disposal.
	const completion = Promise.resolve(subprocess).finally(() => terminal.write('')).then(result => ({
		...result,
		screen: terminal.screen,
	})).finally(() => {
		subprocess.off('data', writeOutput);
		terminal[Symbol.dispose]();
	});
	const resizePty = subprocess.resize;
	const disposePty = subprocess[Symbol.asyncDispose];

	return Object.assign(subprocess, {
		// eslint-disable-next-line unicorn/no-thenable
		then: completion.then.bind(completion),
		getScreen: async () => {
			if (exited) {
				const result = await completion;
				return result.screen;
			}
			await terminal.write('');
			return terminal.screen;
		},
		resize: (cols: number, rows: number) => {
			if (exited) {
				return Promise.resolve();
			}
			return new Promise<void>((resolve, reject) => {
				terminal.terminal.write('', () => {
					// Resize inside the parse callback so subsequent queued output uses the new dimensions.
					try {
						terminal.terminal.resize(cols, rows);
						resizePty(cols, rows);
					} catch (error) {
						// Forward callback-boundary errors to the awaiting test.
						reject(error);
						return;
					}
					resolve();
				});
			});
		},
		[Symbol.asyncDispose]: async () => {
			// Disposal may abort the child. Wait for cleanup without rethrowing cancellation.
			const settled = completion.catch(() => {});
			await disposePty();
			await settled;
		},
	});
};
