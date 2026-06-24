import stringWidth from 'string-width';

/**
 * `string-width` runs a Unicode segmenter and emoji regex over every grapheme,
 * which is comparatively expensive and gets called per rendered line on every
 * frame. Rendered lines repeat heavily — the spinner cycles through a small set
 * of frames and completed task lines are stable — so memoizing by the exact
 * line string keeps the cost to one compute per distinct line, while leaving
 * `string-width` as the source of truth for the actual width.
 */
const cache = new Map<string, number>();

// Bounds memory for pathological inputs (e.g. a status that embeds an
// ever-changing counter). Visible lines are few in practice, so this is rarely
// hit; clearing wholesale is fine since every entry is cheap to recompute.
const maxCacheSize = 10_000;

export const cachedStringWidth = (line: string): number => {
	const cached = cache.get(line);
	if (cached !== undefined) {
		return cached;
	}

	const width = stringWidth(line);
	if (cache.size >= maxCacheSize) {
		cache.clear();
	}
	cache.set(line, width);
	return width;
};
