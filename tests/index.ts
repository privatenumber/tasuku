import { describe } from 'manten';

await describe('tasuku', ({ runTestSuite }) => {
	// API tests
	runTestSuite(import('./specs/api.spec.js'));

	// Type tests
	runTestSuite(import('./specs/types.spec.js'));

	// Renderer tests - organized by feature
	runTestSuite(import('./specs/renderer-visual.spec.js'));
	runTestSuite(import('./specs/renderer-states.spec.js'));
	runTestSuite(import('./specs/renderer-ansi.spec.js'));
	runTestSuite(import('./specs/renderer-spinner.spec.js'));
	runTestSuite(import('./specs/renderer-ci-mode.spec.js'));
	runTestSuite(import('./specs/renderer-colors.spec.js'));
	runTestSuite(import('./specs/renderer-cleanup.spec.js'));
	runTestSuite(import('./specs/renderer-console.spec.js'));
	runTestSuite(import('./specs/renderer-api-coverage.spec.js'));
});
