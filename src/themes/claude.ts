import { rgb } from 'ansis';
import { createTasuku } from '../create-tasuku.ts';
import { pinned } from '../renderers/pinned.ts';
import type { State, TasukuTheme } from '../types.ts';
import {
	terracotta, white, subtle, inactive, success, error, warning,
} from './claude-palette.ts';

/**
 * Claude Code theme.
 *
 * Reverse-engineered from the Claude Code CLI JS bundle.
 * @see https://docs.anthropic.com/en/docs/claude-code
 *
 * ## How to extract the algorithm
 *
 * 1. Find the CLI bundle:
 *    node_modules/@anthropic-ai/claude-code/cli.js
 *
 * 2. Prettify the minified bundle with oxfmt:
 *    cp node_modules/@anthropic-ai/claude-code/cli.js /tmp/claude-cli.js
 *    oxfmt /tmp/claude-cli.js    # reformats in place (--write is default)
 *
 * 3. Search for the spinner characters (✢ is unique enough):
 *    grep -n '✢' /tmp/claude-cli.js
 *
 * 4. Key functions (names are minified, search by structure):
 *    - Spinner frames: aPA() returns platform-specific frames
 *      ["·","✢","✳","✶","✻","✽"] on macOS, ping-ponged [...f, ...f.reverse()]
 *    - Shimmer: oPA() computes glimmerIndex from elapsed time
 *      sweepRange = text.length + 20, glimmerIndex = text.length + 10 - (frame % sweepRange)
 *      frame = Math.floor((Date.now() - startTime) / 200)
 *    - Per-char coloring: TKA() highlights center + adjacent chars (3-wide)
 *      isCenter = (index === glimmerIndex), isAdjacent = (Math.abs(index - glimmerIndex) === 1)
 *    - Color interpolation: w2A() lerps RGB for flash/stall effects
 *
 * 5. Colors (search for rgb(215,119,87)):
 *    terracotta: rgb(215, 119, 87)  — base text + spinner
 *    shimmer:    rgb(245, 149, 117) — highlighted chars
 *    white:      rgb(255, 255, 255) — non-loading text
 *    subtle:     rgb(80, 80, 80)    — dim/pending
 *    success:    rgb(78, 186, 101)  — green checkmark
 *    error:      rgb(255, 107, 128) — pink-red
 *    warning:    rgb(255, 193, 7)   — amber
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

// Platform-specific frames from Claude Code's aPA() function.
// Ghostty and non-macOS substitute some dingbats with ASCII fallbacks.
let spinnerFrames;
if (process.env.TERM === 'xterm-ghostty') {
	spinnerFrames = ['·', '✢', '✳', '✶', '✻', '*'];
} else if (process.platform === 'darwin') {
	spinnerFrames = ['·', '✢', '✳', '✶', '✻', '✽'];
} else {
	spinnerFrames = ['·', '✢', '*', '✶', '✻', '✽'];
}

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
		error,
		warning,
	},
};

export default createTasuku({
	renderer: pinned,
	theme,
});

export type { TasukuTheme } from '../types.ts';
