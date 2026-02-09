// Node v20 compatibility test - runs against built dist
const task = require('../dist/index.cjs');

(async () => {
	const result = await task('Node v20 compatibility test', async () => 'success');

	if (result.result !== 'success') {
		throw new Error('Test failed: expected result to be "success"');
	}

	console.log('Node v20 compatibility test passed');
})().catch((error) => {
	console.error('Test failed:', error);
	throw error;
});
