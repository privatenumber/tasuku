import spawn, { type SubprocessError } from 'nano-spawn';

export type NodeOptions = {
	env?: Record<string, string>;
	cwd?: string;
};

/**
 * Spawns a Node.js process with the same execArgv as the current process.
 * This ensures TypeScript execution (tsx) and import maps work in spawned processes.
 * Forces colors to be enabled for consistent test output.
 */
export const node = (scriptPath: string, options?: NodeOptions) => spawn(
	process.execPath,
	[...process.execArgv, scriptPath],
	{
		...options,
		env: {
			...options?.env,
			FORCE_COLOR: '3',
		},
	},
).catch(error => error as SubprocessError);
