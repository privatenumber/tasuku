/**
 * Simple reactive wrapper for task state
 * Triggers render callback when properties are set
 */

let renderCallback: (() => void) | undefined;

export const setRenderCallback = (callback: () => void) => {
	renderCallback = callback;
};

export const reactive = <T extends object>(target: T): T => new Proxy(target, {
	set(object, prop, value) {
		Reflect.set(object, prop, value);

		// Trigger render on state changes
		if (renderCallback) {
			renderCallback();
		}

		return true;
	},
});
