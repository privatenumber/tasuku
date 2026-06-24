import { createTasuku as createTasukuRaw } from './create-tasuku.ts';
import { inline } from './renderers/inline.ts';
import type { CreateTasukuOptions } from './types.ts';

export const createTasuku = (
	overrides?: Partial<CreateTasukuOptions>,
) => createTasukuRaw({
	renderer: inline,
	...overrides,
});

export default createTasukuRaw({
	renderer: inline,
});

export type {
	State,
	Task,
	TaskPromise,
	TaskInnerAPI,
	TaskFunction,
	TaskGroupPromise,
	TaskOptions,
	CreateTasukuOptions,
	Renderer,
	RendererFactory,
} from './types.ts';
