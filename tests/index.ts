import { describe } from 'manten';

await describe('tasuku', ({ runTestSuite }) => {
	// Renderer tests - must run BEFORE API tests to avoid singleton contamination
	runTestSuite(import('./renderer.spec.js'));

	// API tests
	runTestSuite(import('./api.spec.js'));

	// Type tests
	runTestSuite(import('./types.spec.js'));
});
