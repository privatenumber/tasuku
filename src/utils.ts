/**
 * These utilities are useful because Valtio
 * makes the elements reactive after adding to
 * the array.
 */

export function arrayAdd<T>(
	array: T[],
	element: T,
) {
	const index = array.push(element) - 1;
	return array[index];
}

export function arrayRemove<T>(
	array: T[],
	element: T,
) {
	const index = array.indexOf(element);
	if (index > -1) {
		array.splice(index, 1);
	}
}
