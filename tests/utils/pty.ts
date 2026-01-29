import { spawn } from 'node-pty';

type PtyResult = {
	output: string;
	exitCode: number;
};

/**
 * Spawns a Node.js process in a pseudo-TTY with controlled dimensions.
 * This allows testing terminal-specific behavior like line wrapping.
 */
export const nodePty = (
	scriptPath: string,
	options?: {
		cols?: number;
		rows?: number;
		env?: Record<string, string>;
	},
): Promise<PtyResult> => new Promise((resolve, reject) => {
	const { cols = 80, rows = 24, env = {} } = options ?? {};

	let output = '';

	const ptyProcess = spawn(
		process.execPath,
		[...process.execArgv, scriptPath],
		{
			name: 'xterm-256color',
			cols,
			rows,
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
				...env,
			},
		},
	);

	// Debug logging for CI
	const debug = (message: string) => process.stderr.write(`[PTY DEBUG] ${message}\n`);
	debug(`Spawning: ${process.execPath} ${[...process.execArgv, scriptPath].join(' ')}`);
	debug(`cols=${cols}, rows=${rows}`);

	// tsx loader can take 10+ seconds to start on Linux CI
	const timeout = setTimeout(() => {
		debug(`TIMEOUT - output so far (${output.length} chars): ${output.slice(0, 500)}`);
		ptyProcess.kill();
		reject(new Error('PTY process timed out'));
	}, 30_000);

	ptyProcess.onData((data) => {
		debug(`onData: ${data.length} chars: ${JSON.stringify(data.slice(0, 100))}`);
		output += data;
	});

	ptyProcess.onExit(({ exitCode }) => {
		debug(`onExit: exitCode=${exitCode}`);
		clearTimeout(timeout);
		resolve({
			output,
			exitCode,
		});
	});
});
