import spawn, { type SubprocessError } from 'nano-spawn';

export type NodeOptions = {
	env?: Record<string, string>;
	cwd?: string;
};

/**
 * Spawns a Node.js process with the same execArgv as the current process.
 * This ensures TypeScript execution (tsx) and import maps work in spawned processes.
 */
export const node = (scriptPath: string, options?: NodeOptions) => (
	spawn(
		process.execPath,
		[...process.execArgv, scriptPath],
		options,
	).catch(error => error as SubprocessError)
);
