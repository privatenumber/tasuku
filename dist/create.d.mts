import { C as CreateTasukuOptions, T as Task, R as RendererFactory } from './types-Dq6gzoTH.mjs';
export { a as Renderer, b as TasukuTheme } from './types-Dq6gzoTH.mjs';
import 'node:stream';

declare const createTasuku: ({ theme, renderer: rendererFactory, outputStream, }: CreateTasukuOptions) => Task;

declare const pinned: RendererFactory;

declare const inline: RendererFactory;

export { CreateTasukuOptions, RendererFactory, createTasuku, inline, pinned };
