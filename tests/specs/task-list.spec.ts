import { testSuite, expect } from 'manten';
import { areAllTasksDone } from '../../src/utils/task-list.js';
import type { TaskList } from '../../src/types.js';

const createTask = (
	state: 'pending' | 'loading' | 'success' | 'error' | 'warning',
	children: TaskList = [],
): TaskList[number] => ({
	title: 'test',
	state,
	children,
});

export default testSuite(({ describe }) => {
	describe('areAllTasksDone', ({ test }) => {
		test('empty list returns true', () => {
			const tasks: TaskList = [];
			expect(areAllTasksDone(tasks)).toBe(true);
		});

		test('all success returns true', () => {
			const tasks: TaskList = [
				createTask('success'),
				createTask('success'),
			];
			expect(areAllTasksDone(tasks)).toBe(true);
		});

		test('error state counts as done', () => {
			const tasks: TaskList = [
				createTask('error'),
			];
			expect(areAllTasksDone(tasks)).toBe(true);
		});

		test('warning state counts as done', () => {
			const tasks: TaskList = [
				createTask('warning'),
			];
			expect(areAllTasksDone(tasks)).toBe(true);
		});

		test('mixed terminal states (success + error + warning) returns true', () => {
			const tasks: TaskList = [
				createTask('success'),
				createTask('error'),
				createTask('warning'),
			];
			expect(areAllTasksDone(tasks)).toBe(true);
		});

		test('one loading returns false', () => {
			const tasks: TaskList = [
				createTask('success'),
				createTask('loading'),
			];
			expect(areAllTasksDone(tasks)).toBe(false);
		});

		test('one pending returns false', () => {
			const tasks: TaskList = [
				createTask('success'),
				createTask('pending'),
			];
			expect(areAllTasksDone(tasks)).toBe(false);
		});

		test('nested: parent done but child loading returns false', () => {
			const children: TaskList = [createTask('loading')];
			const tasks: TaskList = [
				createTask('success', children),
			];
			expect(areAllTasksDone(tasks)).toBe(false);
		});

		test('nested: all children done returns true', () => {
			const children: TaskList = [
				createTask('success'),
				createTask('warning'),
			];
			const tasks: TaskList = [
				createTask('success', children),
			];
			expect(areAllTasksDone(tasks)).toBe(true);
		});

		test('deeply nested: pending at depth 3 returns false', () => {
			const deep: TaskList = [createTask('pending')];
			const mid: TaskList = [createTask('success', deep)];
			const tasks: TaskList = [createTask('success', mid)];
			expect(areAllTasksDone(tasks)).toBe(false);
		});
	});
});
