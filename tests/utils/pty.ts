import { spawn, waitFor } from 'pty-spawn';

type NodePtyOptions = {
	cols?: number;
	rows?: number;
	env?: Record<string, string>;
};

export { waitFor };

/**
 * Spawns a Node.js process in a pseudo-TTY.
 *
 * Simple:
 *   const { output, exitCode } = await nodePty(script);
 *
 * Interactive:
 *   const subprocess = nodePty(script, { cols: 80, rows: 10 });
 *   await waitFor(subprocess, output => output.includes('DONE'));
 *   subprocess.resize(80, 40);
 *   const { output, exitCode } = await subprocess;
 */
export const nodePty = (
	scriptPath: string,
	options?: NodePtyOptions,
) => spawn(
	process.execPath,
	[...process.execArgv, scriptPath],
	{
		name: 'xterm-256color',
		window: {
			cols: options?.cols ?? 80,
			rows: options?.rows ?? 24,
		},
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
