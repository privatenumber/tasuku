import { C as CreateTasukuOptions, T as Task, a as RendererFactory } from './types-CHLyZVi8.mjs';
export { R as Renderer, g as TasukuTheme } from './types-CHLyZVi8.mjs';
import 'node:stream';

declare const createTasuku: ({ theme, renderer: rendererFactory, outputStream, }: CreateTasukuOptions) => Task;

declare const pinned: RendererFactory;

declare const inline: RendererFactory;

export { CreateTasukuOptions, RendererFactory, createTasuku, inline, pinned };
