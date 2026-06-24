import type { TaskObject } from '../types.ts';
import { colors } from '../style.ts';
import { formatElapsed } from './format-elapsed.ts';

export const formatTaskLine = (
	task: TaskObject,
	icon: string,
	depth: number,
): string => {
	const indent = '  '.repeat(depth);

	let line = `${indent}${icon} ${task.title}`;

	if (task.status) {
		line += ` ${colors.dim(`[${task.status}]`)}`;
	}

	const elapsedMs = task.elapsedMs ?? (
		task.startedAt === undefined
			? undefined
			: Date.now() - task.startedAt
	);
	if (elapsedMs !== undefined && elapsedMs >= 1000) {
		line += ` ${colors.dim(formatElapsed(elapsedMs))}`;
	}

	return line;
};
