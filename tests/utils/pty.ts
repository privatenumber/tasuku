import { nanoPty, type PtyProcess } from './nano-pty.js';

export type { PtyResult, PtyProcess } from './nano-pty.js';

/**
 * Spawns a Node.js process in a pseudo-TTY.
 *
 * Simple:
 *   const { output, exitCode } = await nodePty(script);
 *
 * Interactive:
 *   const pty = nodePty(script, { cols: 80, rows: 10 });
 *   for await (const _ of pty) {
 *     if (pty.output.includes('DONE')) break;
 *   }
 *   pty.resize(80, 40);
 *   const { output, exitCode } = await pty;
 */
export const nodePty = (
	scriptPath: string,
	options?: {
		cols?: number;
		rows?: number;
		env?: Record<string, string>;
	},
): PtyProcess => nanoPty(
	process.execPath,
	[...process.execArgv, scriptPath],
	{
		name: 'xterm-256color',
		cols: options?.cols ?? 80,
		rows: options?.rows ?? 24,
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
