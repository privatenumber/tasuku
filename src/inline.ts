import { createTasuku as createTasukuRaw } from './create-tasuku.ts';
import { inline } from './renderers/inline.ts';
import { theme } from './themes/default.ts';
import type { CreateTasukuOptions } from './types.ts';

export { theme } from './themes/default.ts';

export const createTasuku = (
	overrides?: Partial<CreateTasukuOptions>,
) => createTasukuRaw({
	renderer: inline,
	theme,
	...overrides,
});

export default createTasukuRaw({
	renderer: inline,
	theme,
});

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
	Renderer,
	RendererFactory,
} from './types.ts';
