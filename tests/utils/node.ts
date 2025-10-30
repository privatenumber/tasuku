import spawn, { type SubprocessError } from 'nano-spawn';

/**
 * Spawns a Node.js process with the same execArgv as the current process.
 * This ensures TypeScript execution (tsx) and import maps work in spawned processes.
 *
 * By default, unsets known color and CI environment variables to prevent inheritance.
 * Tests can explicitly set them in the env parameter if needed.
 */
export const node = (
	scriptPath: string,
	env?: Record<string, string | undefined>,
) => spawn(
	process.execPath,
	[...process.execArgv, scriptPath],
	{
		env: {
			...process.env,
			// Unset known color env vars by default
			FORCE_COLOR: undefined,
			NO_COLOR: undefined,
			NODE_DISABLE_COLORS: undefined,
			// Unset CI env vars to prevent Ink from inheriting CI mode
			CI: undefined,
			GITHUB_ACTIONS: undefined,
			CONTINUOUS_INTEGRATION: undefined,
			BUILD_NUMBER: undefined,
			...env,
		},
	},
).catch(error => error as SubprocessError);
