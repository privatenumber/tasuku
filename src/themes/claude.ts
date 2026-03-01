import { rgb } from 'ansis';
import { createTasuku } from '../create-tasuku.ts';
import { pinned } from '../renderers/pinned.ts';
import type { State, TasukuTheme } from '../types.ts';
import {
	terracotta, white, subtle, inactive, success, error, warning,
	errorDim, warningDim,
} from './claude-palette.ts';

/**
 * Claude Code theme.
 *
 * Colors from the dark theme (internal variable wkD in compiled binary).
 * Spinner frames are middle dot + dingbat stars, ping-ponged (forward then reverse).
 *
 * Extracted from Claude Code CLI v2.1.37 binary via `strings`.
 * @see https://docs.anthropic.com/en/docs/claude-code
 */
const claudeShimmer = rgb(245, 149, 117);

const shimmerTitle = (text: string, state: State, frame: number): string => {
	if (state !== 'loading') {
		return white(text);
	}

	const sweepRange = text.length + 20;
	// Right-to-left sweep (matches Claude Code "responding" mode)
	const glimmerIndex = text.length + 10 - (frame % sweepRange);

	const start = glimmerIndex - 1;
	const end = glimmerIndex + 2;

	const before = start > 0 ? text.slice(0, start) : '';
	const shimmer = text.slice(Math.max(0, start), Math.min(text.length, end));
	const after = end < text.length ? text.slice(end) : '';

	return terracotta(before) + claudeShimmer(shimmer) + terracotta(after);
};

// Frames from binary: ["\xB7","\u2722","\u2733","\u2736","\u273B","\u273D"]
// Claude Code ping-pongs: [...frames, ...[...frames].reverse()]
const spinnerFrames = ['·', '✢', '✳', '✶', '✻', '✽'];

export const theme: TasukuTheme = {
	spinner: [...spinnerFrames, ...[...spinnerFrames].reverse()].map(frame => terracotta(frame)),
	spinnerInterval: 200,

	icons: {
		pending: subtle('◼'),
		success: success('✔'),
		error: error('✖'),
		warning: warning('⚠'),
		skipped: subtle('⊘'),
		parent: terracotta('❯'),
		parentError: error('❯'),
	},

	colors: {
		title: shimmerTitle,
		dim: subtle,
		secondary: inactive,
		error: errorDim,
		warning: warningDim,
	},
};

export default createTasuku({
	renderer: pinned,
	theme,
});

export type { TasukuTheme } from '../types.ts';
