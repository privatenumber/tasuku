import { createTasuku as createTasukuRaw } from './create-tasuku.ts';
import { pinned } from './renderers/pinned.ts';
import type { CreateTasukuOptions } from './types.ts';

export const createTasuku = (
	overrides?: Partial<CreateTasukuOptions>,
) => createTasukuRaw({
	renderer: pinned,
	...overrides,
});

export default createTasukuRaw({
	renderer: pinned,
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
