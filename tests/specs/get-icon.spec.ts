import { describe, test, expect } from 'manten';
import { getIcon } from '../../src/utils/get-icon.ts';
import { icons, spinner } from '../../src/style.ts';

describe('getIcon', () => {
	test('loading without children returns spinner frame', () => {
		expect(getIcon('loading', false, 0)).toBe(spinner[0]);
		expect(getIcon('loading', false, 2)).toBe(spinner[2]);
	});

	test('loading with children returns parent icon', () => {
		expect(getIcon('loading', true, 0)).toBe(icons.parent);
	});

	test('success without children returns success icon', () => {
		expect(getIcon('success', false, 0)).toBe(icons.success);
	});

	test('success with children returns parent icon', () => {
		expect(getIcon('success', true, 0)).toBe(icons.parent);
	});

	test('error without children returns error icon', () => {
		expect(getIcon('error', false, 0)).toBe(icons.error);
	});

	test('error with children returns parentError icon', () => {
		expect(getIcon('error', true, 0)).toBe(icons.parentError);
	});

	test('warning returns warning icon regardless of children', () => {
		expect(getIcon('warning', false, 0)).toBe(icons.warning);
		expect(getIcon('warning', true, 0)).toBe(icons.warning);
	});

	test('skipped returns skipped icon regardless of children', () => {
		expect(getIcon('skipped', false, 0)).toBe(icons.skipped);
		expect(getIcon('skipped', true, 0)).toBe(icons.skipped);
	});

	test('pending returns pending icon regardless of children', () => {
		expect(getIcon('pending', false, 0)).toBe(icons.pending);
		expect(getIcon('pending', true, 0)).toBe(icons.pending);
	});
});
