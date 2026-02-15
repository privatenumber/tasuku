import type { TaskObject, TasukuTheme } from '../types.ts';
import { formatElapsed } from './format-elapsed.ts';

export const formatTaskLine = (
	task: TaskObject,
	icon: string,
	depth: number,
	theme: TasukuTheme,
	animationFrame: number,
): string => {
	const indent = '  '.repeat(depth);

	const styledTitle = theme.colors.title
		? theme.colors.title(task.title, task.state, animationFrame)
		: task.title;
	let line = `${indent}${icon} ${styledTitle}`;

	if (task.status) {
		line += ` ${theme.colors.dim(`[${task.status}]`)}`;
	}

	const elapsedMs = task.elapsedMs ?? (
		task.startedAt === undefined
			? undefined
			: Date.now() - task.startedAt
	);
	if (elapsedMs !== undefined && elapsedMs >= 1000) {
		line += ` ${theme.colors.dim(formatElapsed(elapsedMs))}`;
	}

	return line;
};
