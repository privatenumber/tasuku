// Node v20 compatibility test - runs against built dist
import task from '../dist/index.mjs';

const result = await task('Node v20 compatibility test', async () => 'success');

if (result !== 'success') {
	throw new Error('Test failed: expected result to be "success"');
}

console.log('Node v20 compatibility test passed');
