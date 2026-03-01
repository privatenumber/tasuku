import { dim } from 'ansis';
import { createTasuku } from '../create-tasuku.ts';
import { pinned } from '../renderers/pinned.ts';
import type { TasukuTheme } from '../types.ts';
import {
	terracotta, white, subtle, inactive, success, error, warning,
	errorDim, warningDim,
} from './claude-palette.ts';

/**
 * Blink theme — ⏺ pulses between bright and dim during loading.
 *
 * Matches Claude Code's reduced-motion spinner:
 * - 2-second cycle (1s bright, 1s dim)
 * - Character: ⏺ (U+23FA on macOS) / ● (U+25CF elsewhere)
 *
 * Uses the same Claude Code color palette.
 */
const dot = process.platform === 'darwin' ? '⏺' : '●';

export const theme: TasukuTheme = {
	spinner: [terracotta(dot), dim(terracotta(dot))],
	spinnerInterval: 1000,

	icons: {
		pending: subtle(dot),
		success: success(dot),
		error: error(dot),
		warning: warning(dot),
		skipped: subtle(dot),
		parent: terracotta('❯'),
		parentError: error('❯'),
	},

	colors: {
		title: white,
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
