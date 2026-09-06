import {
	spawn,
	waitFor,
	type Result as RawPtyResult,
	type Subprocess as RawPtyProcess,
} from 'pty-spawn';
import { createTerminal } from './terminal.ts';

type NodePtyOptions = {
	cols?: number;
	rows?: number;
	env?: Record<string, string>;
};

export type PtyResult = RawPtyResult & {
	rawOutput: string;
	screen: string;
};

export type PtyProcess = Omit<RawPtyProcess, 'then' | 'resize'> & {
	readonly rawOutput: string;
	then: Promise<PtyResult>['then'];
	getScreen: () => Promise<string>;
	write: (data: string) => void;
	resize: (cols: number, rows: number) => Promise<void>;
};

export { waitFor };

/**
 * Spawns a Node.js process in a pseudo-TTY.
 * `screen` contains physical terminal rows and retained scrollback. It removes
 * each row's trailing spaces and trailing empty rows, without adding a newline.
 */
export const nodePty = (
	scriptPath: string,
	options?: NodePtyOptions,
): PtyProcess => {
	const dimensions = {
		cols: options?.cols ?? 80,
		rows: options?.rows ?? 24,
	};
	const subprocess = spawn(
		process.execPath,
		[...process.execArgv, scriptPath],
		{
			name: 'xterm-256color',
			reject: false,
			window: dimensions,
			cwd: process.cwd(),
			env: {
				...process.env,
				NO_COLOR: '',
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
	let parsedLength = 0;
	let finalScreen = '';
	let finished = false;
	const parseOutput = (async () => {
		for await (const chunk of subprocess) {
			parsedLength += chunk.length;
			terminal.terminal.write(chunk);
		}
	})();
	// Capture completion before replacing the thenable below.
	const rawCompletion = subprocess.then(result => result);
	const completion = rawCompletion.finally(async () => {
		await parseOutput;
		if (parsedLength < subprocess.output.length) {
			terminal.terminal.write(subprocess.output.slice(parsedLength));
		}
		await terminal.write('');
		finalScreen = terminal.screen;
		finished = true;
	}).then(result => ({
		...result,
		rawOutput: result.output,
		screen: finalScreen,
	})).finally(() => {
		terminal[Symbol.dispose]();
	});
	const resizePty = subprocess.resize;
	const disposePty = subprocess[Symbol.asyncDispose];
	const pty = {
		pid: subprocess.pid,
		kill: subprocess.kill,
		stdin: subprocess.stdin,
		[Symbol.asyncIterator]: subprocess[Symbol.asyncIterator],
		// eslint-disable-next-line unicorn/no-thenable
		then: completion.then.bind(completion),
		getScreen: async () => {
			if (finished) {
				return finalScreen;
			}
			await terminal.write('');
			return terminal.screen;
		},
		write: (data: string) => {
			subprocess.stdin.write(data);
		},
		resize: async (cols: number, rows: number) => {
			await terminal.write('');
			terminal.terminal.resize(cols, rows);
			resizePty(cols, rows);
		},
		[Symbol.asyncDispose]: async () => {
			const settled = completion.catch(() => {});
			await disposePty();
			await settled;
		},
	} as PtyProcess;

	Object.defineProperties(pty, {
		output: {
			get: () => subprocess.output,
		},
		rawOutput: {
			get: () => subprocess.output,
		},
	});

	return pty;
};
