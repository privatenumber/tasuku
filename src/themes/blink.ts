import { rgb, dim } from 'ansis';
import { createTasuku } from '../create-tasuku.ts';
import { pinned } from '../renderers/pinned.ts';
import type { TasukuTheme } from '../types.ts';

/**
 * Blink theme — ⏺ pulses between bright and dim during loading.
 *
 * Matches Claude Code's reduced-motion spinner:
 * - 2-second cycle (1s bright, 1s dim)
 * - Character: ⏺ (U+23FA on macOS) / ● (U+25CF elsewhere)
 *
 * Uses the same Claude Code color palette.
 */
const terracotta = rgb(215, 119, 87);
const white = rgb(255, 255, 255);

const dot = process.platform === 'darwin' ? '⏺' : '●';

export const theme: TasukuTheme = {
	spinner: [terracotta(dot), dim(terracotta(dot))],
	spinnerInterval: 1000,

	icons: {
		pending: rgb(80, 80, 80)(dot),
		success: rgb(78, 186, 101)(dot),
		error: rgb(255, 107, 128)(dot),
		warning: rgb(255, 193, 7)(dot),
		skipped: rgb(80, 80, 80)(dot),
		parent: terracotta('❯'),
		parentError: rgb(255, 107, 128)('❯'),
	},

	colors: {
		title: white,
		dim: rgb(80, 80, 80),
		secondary: rgb(153, 153, 153),
		error: rgb(180, 75, 90),
		warning: rgb(180, 136, 5),
	},
};

export default createTasuku({
	renderer: pinned,
	theme,
});

export type { TasukuTheme } from '../types.ts';
