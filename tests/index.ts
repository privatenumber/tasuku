import { describe } from 'manten';

await describe('tasuku', ({ runTestSuite }) => {
	// Core API
	runTestSuite(import('./specs/api.spec.js'));

	// Type inference
	runTestSuite(import('./specs/types.spec.js'));

	// Task functionality
	runTestSuite(import('./specs/task-states.spec.js'));
	runTestSuite(import('./specs/task-methods.spec.js'));

	// Visual rendering
	runTestSuite(import('./specs/rendering.spec.js'));
	runTestSuite(import('./specs/ansi.spec.js'));

	// Environment
	runTestSuite(import('./specs/environment.spec.js'));

	// Lifecycle
	runTestSuite(import('./specs/lifecycle.spec.js'));

	// Console interleaving
	runTestSuite(import('./specs/console-interleave.spec.js'));
});
