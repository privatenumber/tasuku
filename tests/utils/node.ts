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
		|| env.FORCE_COLOR === '0'
	);

	return spawn(
		process.execPath,
		[...process.execArgv, scriptPath],
		{
			env: {
				// nano-spawn inherits the parent environment

				// 1. Override controlled vars to prevent parent env leaking.
				// Empty string is falsy for all of these, effectively disabling them.
				// (undefined doesn't override inherited env vars in nano-spawn)
				NO_COLOR: '',
				CI: '',
				GITHUB_ACTIONS: '',
				CONTINUOUS_INTEGRATION: '',
				BUILD_NUMBER: '',

				// 2. Apply our test default to force color (unless test disables it)
				...(!hasColorDisable && { FORCE_COLOR: '1' }),

				// 3. Apply test-specific overrides (e.g., NO_COLOR: '1')
				...env,
			},
		},
	).catch(error => error as SubprocessError);
};
