import { describe, test, expect } from 'manten';
import { getIcon } from '../../src/utils/get-icon.ts';
import type { TasukuTheme } from '../../src/types.ts';

const mockTheme: TasukuTheme = {
	spinner: ['frame0', 'frame1', 'frame2'],
	icons: {
		pending: 'PENDING',
		success: 'SUCCESS',
		error: 'ERROR',
		warning: 'WARNING',
		parent: 'PARENT',
		parentError: 'PARENT_ERROR',
	},
	colors: {
		dim: (text: string) => text,
		secondary: (text: string) => text,
	},
};

describe('getIcon', () => {
	test('loading without children returns spinner frame', () => {
		expect(getIcon('loading', false, mockTheme, 0)).toBe('frame0');
		expect(getIcon('loading', false, mockTheme, 2)).toBe('frame2');
	});

	test('loading with children returns parent icon', () => {
		expect(getIcon('loading', true, mockTheme, 0)).toBe('PARENT');
	});

	test('success without children returns success icon', () => {
		expect(getIcon('success', false, mockTheme, 0)).toBe('SUCCESS');
	});

	test('success with children returns parent icon', () => {
		expect(getIcon('success', true, mockTheme, 0)).toBe('PARENT');
	});

	test('error without children returns error icon', () => {
		expect(getIcon('error', false, mockTheme, 0)).toBe('ERROR');
	});

	test('error with children returns parentError icon', () => {
		expect(getIcon('error', true, mockTheme, 0)).toBe('PARENT_ERROR');
	});

	test('warning returns warning icon regardless of children', () => {
		expect(getIcon('warning', false, mockTheme, 0)).toBe('WARNING');
		expect(getIcon('warning', true, mockTheme, 0)).toBe('WARNING');
	});

	test('pending returns pending icon regardless of children', () => {
		expect(getIcon('pending', false, mockTheme, 0)).toBe('PENDING');
		expect(getIcon('pending', true, mockTheme, 0)).toBe('PENDING');
	});
});
