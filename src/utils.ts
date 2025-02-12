/**
 * These utilities are useful because Valtio
 * makes the elements reactive after adding to
 * the array.
 */

export const arrayAdd = <T>(
	array: T[],
	element: T,
) => {
	const index = array.push(element) - 1;
	return array[index];
};

export const arrayRemove = <T>(
	array: T[],
	element: T,
) => {
	const index = array.indexOf(element);
	if (index !== -1) {
		array.splice(index, 1);
	}
};
