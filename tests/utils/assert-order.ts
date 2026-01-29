export const assertInOrder = (
	haystack: string,
	needles: string[],
): void => {
	let lastIndex = -1;

	for (const needle of needles) {
		const index = haystack.indexOf(needle);
		if (index === -1) {
			throw new Error(`Expected to find "${needle}" in output`);
		}
		if (index <= lastIndex) {
			throw new Error(`Expected "${needle}" to appear after previous match`);
		}
		lastIndex = index;
	}
};
