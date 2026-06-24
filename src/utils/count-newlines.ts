/**
 * Count `\n` in a string. Called per task on every render. Uses `indexOf` to
 * scan natively to each newline (much faster than a JS char loop, and without
 * the throwaway array of `str.split('\n').length`) — task lines are sparse in
 * newlines, so this returns quickly.
 */
export const countNewlines = (text: string): number => {
	let count = 0;
	let index = text.indexOf('\n');
	while (index !== -1) {
		count += 1;
		index = text.indexOf('\n', index + 1);
	}
	return count;
};
