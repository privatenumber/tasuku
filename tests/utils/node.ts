import spawn, { type SubprocessError } from 'nano-spawn';

/**
 * Spawns a Node.js process with the same execArgv as the current process.
 * This ensures TypeScript execution (tsx) and import maps work in spawned processes.
 *
 * By default, forces color and unsets known CI variables to prevent inheritance.
 * Tests can explicitly override these in the env parameter if needed.
 */
export const node = (
	scriptPath: string,
	env?: Record<string, string | undefined>,
) => {
	// If test explicitly sets a color-disabling var, don't also set FORCE_COLOR
	const hasColorDisable = env && (
		env.NO_COLOR !== undefined
		|| env.NODE_DISABLE_COLORS !== undefined
		|| env.FORCE_COLOR === '0'
	);

	return spawn(
		process.execPath,
		[...process.execArgv, scriptPath],
		{
			env: {
				// nano-spawn inherits the parent environment

				// 1. Unset all controlled vars for a clean slate
				FORCE_COLOR: undefined,
				NO_COLOR: undefined,
				NODE_DISABLE_COLORS: undefined,
				CI: undefined,
				GITHUB_ACTIONS: undefined,
				CONTINUOUS_INTEGRATION: undefined,
				BUILD_NUMBER: undefined,

				// 2. Apply our test default to force color (unless test disables it)
				...(!hasColorDisable && { FORCE_COLOR: '1' }),

				// 3. Apply test-specific overrides (e.g., NO_COLOR: '1')
				...env,
			},
		},
	).catch(error => error as SubprocessError);
};
