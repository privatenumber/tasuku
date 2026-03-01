import { describe, test, expect } from 'manten';
import { reactive } from '../../src/reactive.ts';

describe('reactive', () => {
	test('setting a property triggers onChange', () => {
		let callCount = 0;
		const proxy = reactive({ value: 0 }, () => { callCount += 1; });

		proxy.value = 1;
		expect(callCount).toBe(1);
	});

	test('multiple sets trigger multiple callbacks', () => {
		let callCount = 0;
		const proxy = reactive({
			a: 0,
			b: 0,
		}, () => { callCount += 1; });

		proxy.a = 1;
		proxy.b = 2;
		proxy.a = 3;
		expect(callCount).toBe(3);
	});

	test('reading returns the set value', () => {
		const proxy = reactive({ name: 'initial' }, () => {});

		proxy.name = 'updated';
		expect(proxy.name).toBe('updated');
	});

	test('initial properties are accessible', () => {
		const proxy = reactive({
			x: 10,
			y: 'hello',
		}, () => {});

		expect(proxy.x).toBe(10);
		expect(proxy.y).toBe('hello');
	});

	test('setting same value does not trigger onChange', () => {
		let callCount = 0;
		const proxy = reactive({ value: 5 }, () => { callCount += 1; });

		proxy.value = 5;
		expect(callCount).toBe(0);
	});
});
