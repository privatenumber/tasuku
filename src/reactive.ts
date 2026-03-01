/**
 * Simple reactive wrapper for task state.
 * Triggers the provided callback when properties are set.
 */
export const reactive = <T extends object>(
	target: T,
	onChange: () => void,
): T => new Proxy(target, {
	set(object, prop, value) {
		const previous = Reflect.get(object, prop);
		Reflect.set(object, prop, value);
		if (previous !== value) {
			onChange();
		}
		return true;
	},
});
