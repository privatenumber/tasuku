import { describe } from 'manten';

await describe('tasuku', ({ runTestSuite }) => {
	// Core API
	runTestSuite(import('./specs/api.spec.ts'));
	runTestSuite(import('./specs/types.spec.ts'));

	// Task behavior
	runTestSuite(import('./specs/task-states.spec.ts'));
	runTestSuite(import('./specs/elapsed-time.spec.ts'));
	runTestSuite(import('./specs/stream-preview.spec.ts'));

	// Rendering
	runTestSuite(import('./specs/rendering.spec.ts'));
	runTestSuite(import('./specs/spinner-restart.spec.ts'));
	runTestSuite(import('./specs/max-visible.spec.ts'));

	// Environment
	runTestSuite(import('./specs/environment.spec.ts'));

	// Console & Lifecycle
	runTestSuite(import('./specs/console-interleave.spec.ts'));
	runTestSuite(import('./specs/lifecycle.spec.ts'));

	// Unit tests
	runTestSuite(import('./specs/format-elapsed.spec.ts'));
	runTestSuite(import('./specs/task-list.spec.ts'));

	// Factory
	runTestSuite(import('./specs/create-tasuku.spec.ts'));
	runTestSuite(import('./specs/claude-theme.spec.ts'));
	runTestSuite(import('./specs/blink-theme.spec.ts'));
	runTestSuite(import('./specs/codex-theme.spec.ts'));
});
