export const isCI = Boolean(
	process.env.CI
	|| process.env.CONTINUOUS_INTEGRATION
	|| process.env.BUILD_NUMBER,
);
