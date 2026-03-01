import { rgb } from 'ansis';
import { createTasuku } from '../create-tasuku.ts';
import { pinned } from '../renderers/pinned.ts';
import type { State, TasukuTheme } from '../types.ts';

/**
 * Claude Code theme.
 *
 * Colors from the dark theme (internal variable wkD in compiled binary).
 * Spinner frames are middle dot + dingbat stars, ping-ponged (forward then reverse).
 *
 * Extracted from Claude Code CLI v2.1.37 binary via `strings`.
 * @see https://docs.anthropic.com/en/docs/claude-code
 */
const terracotta = rgb(215, 119, 87);
const white = rgb(255, 255, 255);
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
		pending: rgb(80, 80, 80)('◼'),
		success: rgb(78, 186, 101)('✔'),
		error: rgb(255, 107, 128)('✖'),
		warning: rgb(255, 193, 7)('⚠'),
		parent: terracotta('❯'),
		parentError: rgb(255, 107, 128)('❯'),
	},

	// Dark theme color palette (wkD) from Claude Code binary
	colors: {
		title: shimmerTitle,
		dim: rgb(80, 80, 80), // "subtle" — dark gray
		secondary: rgb(153, 153, 153), // "inactive" — mid gray
		error: rgb(180, 75, 90), // dimmed pink-red
		warning: rgb(180, 136, 5), // dimmed amber
	},
};

export default createTasuku({
	renderer: pinned,
	theme,
});

export type { TasukuTheme } from '../types.ts';
