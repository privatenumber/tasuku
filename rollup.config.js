import { builtinModules } from 'module';
import { defineConfig } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import dts from 'rollup-plugin-dts';

export default [
	defineConfig({
		input: './src/index.ts',
		plugins: [
			nodeResolve(),
			commonjs(),
			json(),
			esbuild({
				// minify: true,
			}),
		],
		external: [
			...builtinModules,
			'yoga-layout-prebuilt',
		],
		output: [
			{
				format: 'esm',
				file: './dist/index.mjs',
			},
			{
				format: 'cjs',
				file: './dist/index.js',
				exports: 'auto',
			},
		],
	}),
	defineConfig({
		input: './src/index.ts',
		plugins: [
			dts({
				respectExternal: true,
			}),
		],
		output: {
			file: './dist/index.d.ts',
		},
	}),
];
