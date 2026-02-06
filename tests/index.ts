import { describe } from 'manten';

await describe('tasuku', ({ runTestSuite }) => {
	// Core API
	runTestSuite(import('./specs/api.spec.js'));
	runTestSuite(import('./specs/types.spec.js'));

	// Task behavior
	runTestSuite(import('./specs/task-states.spec.js'));
	runTestSuite(import('./specs/elapsed-time.spec.js'));

	// Rendering
	runTestSuite(import('./specs/rendering.spec.js'));
	runTestSuite(import('./specs/spinner-restart.spec.js'));
	runTestSuite(import('./specs/max-visible.spec.js'));

	// Environment
	runTestSuite(import('./specs/environment.spec.js'));

	// Console & Lifecycle
	runTestSuite(import('./specs/console-interleave.spec.js'));
	runTestSuite(import('./specs/lifecycle.spec.js'));

	// Unit tests
	runTestSuite(import('./specs/format-elapsed.spec.js'));
	runTestSuite(import('./specs/visual-line-count.spec.js'));
	runTestSuite(import('./specs/task-list.spec.js'));
});
