import {
	rgb, dim, green, red, yellow,
} from 'ansis';
import { createTasuku } from './create-tasuku.ts';
import type { State, TasukuTheme } from './types.ts';

/**
 * Codex (OpenAI CLI) theme.
 *
 * Shimmer: cosine-based intensity band sweeping right across text/spinner,
 * blending between terminal-default fg (fallback gray 128) and bg (fallback white 255)
 * at 0.9 max alpha. All shimmer text is bold.
 *
 * Parameters from codex-rs/tui/src/shimmer.rs:
 * - sweep period: 2 s
 * - padding: 10 chars on each side
 * - band half-width: 5 (cosine falloff)
 *
 * Icons from codex-rs/tui/src/exec_cell/render.rs:
 * - spinner: shimmer_spans("•")
 * - success: "✓".green().bold()
 * - error: "✗".red().bold()
 *
 * @see https://github.com/openai/codex
 */

// Shimmer parameters (shimmer.rs)
const PADDING = 10;
const SWEEP_MS = 2000;
const BAND_HALF_WIDTH = 5;
const SPINNER_INTERVAL = 50;

// Terminal default color fallbacks (terminal_palette.rs)
const BASE_GRAY = 128;
const HIGHLIGHT_WHITE = 255;

const cosineIntensity = (distance: number): number => {
	if (distance > BAND_HALF_WIDTH) {
		return 0;
	}
	return 0.5 * (1 + Math.cos((Math.PI * distance) / BAND_HALF_WIDTH));
};

const blendGray = (intensity: number): number => {
	const alpha = intensity * 0.9;
	return Math.round(HIGHLIGHT_WHITE * alpha + BASE_GRAY * (1 - alpha));
};

// Pre-compute spinner frames for '•' with cosine shimmer
const DOT = '\u2022';
const dotPeriod = 1 + PADDING * 2;
const frameCount = SWEEP_MS / SPINNER_INTERVAL;

const spinnerFrames: string[] = [];
for (let f = 0; f < frameCount; f += 1) {
	const position = (f / frameCount) * dotPeriod;
	const distance = Math.abs(PADDING - position);
	const channel = blendGray(cosineIntensity(distance));
	spinnerFrames.push(rgb(channel, channel, channel).bold(DOT));
}

// Shimmer title: per-character cosine gradient during loading
const shimmerTitle = (text: string, state: State, frame: number): string => {
	if (state !== 'loading') {
		return text;
	}

	const period = text.length + PADDING * 2;
	const elapsedMs = frame * SPINNER_INTERVAL;
	const position = ((elapsedMs % SWEEP_MS) / SWEEP_MS) * period;

	let result = '';
	for (let i = 0; i < text.length; i += 1) {
		const charPosition = i + PADDING;
		const distance = Math.abs(charPosition - position);
		const channel = blendGray(cosineIntensity(distance));
		result += rgb(channel, channel, channel).bold(text[i]);
	}
	return result;
};

const gray = rgb(BASE_GRAY, BASE_GRAY, BASE_GRAY);

export const theme: TasukuTheme = {
	spinner: spinnerFrames,
	spinnerInterval: SPINNER_INTERVAL,

	icons: {
		pending: dim(DOT),
		success: green.bold('\u2713'),
		error: red.bold('\u2717'),
		warning: yellow('\u26A0'),
		parent: gray('\u276F'),
		parentError: red.bold('\u276F'),
	},

	colors: {
		title: shimmerTitle,
		dim: gray,
		secondary: rgb(153, 153, 153),
	},
};

export { createTasuku } from './create-tasuku.ts';

export default createTasuku({ theme });

export type {
	State,
	Task,
	TaskPromise,
	TaskInnerAPI,
	TaskFunction,
	TaskGroupPromise,
	TaskOptions,
	TasukuTheme,
	CreateTasukuOptions,
} from './types.ts';
