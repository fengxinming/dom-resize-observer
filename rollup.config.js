import { defineConfig } from 'rollup';
// import buble from '@rollup/plugin-buble';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import empty from 'rollup-plugin-empty';
import copy from 'rollup-plugin-copy';
import importShaking from 'rollup-plugin-import-shaking';
import replaceImports from 'rollup-plugin-replace-imports';
import filesize from 'rollup-plugin-filesize';
import camelCase from 'camelcase';
import pkg from './package.json';

const moduleName = pkg.name;
const cjsExternal = Object.keys(pkg.dependencies);

export default [
  defineConfig({
    input: 'src/index.ts',
    external: cjsExternal,
    plugins: [
      empty({
        silent: false,
        dir: 'dist'
      }),
      replace({
        preventAssignment: true,
        values: {
          __VERSION__: pkg.version
        }
      }),
      typescript(),
      nodeResolve(),
      commonjs(),
      importShaking({
        modules: [{
          name: [
            '@ali/iot-cloud-util'
          ],
          importModule(namedExport, packageName) {
            return `${packageName}/es/${namedExport}`;
          }
        }]
      }),
      copy({
        hook: 'writeBundle',
        targets: [
          { src: ['README.md', 'package.json'], dest: 'dist' },
          { src: 'types/index.d.ts', dest: 'dist' }
        ]
      }),
      filesize()
    ],
    output: [{
      file: 'dist/cjs.js',
      format: 'cjs',
      exports: 'auto',
      plugins: [
        replaceImports((n) => n.replace('/es/', '/'))
      ]
    }, {
      file: 'dist/esm.js',
      format: 'esm',
      exports: 'auto'
    }]
  }),
  defineConfig({
    input: 'dist/esm.js',
    plugins: [
      nodeResolve(),
      commonjs(),
      // buble(),
      filesize(),
      copy({
        hook: 'writeBundle',
        targets: [
          { src: 'dist/index.js', dest: 'examples' }
        ]
      })
    ],
    output: [{
      file: 'dist/index.js',
      format: 'umd',
      name: camelCase(moduleName, { pascalCase: true, preserveConsecutiveUppercase: true }),
      exports: 'auto'
    }, {
      file: 'dist/index.min.js',
      format: 'umd',
      name: camelCase(moduleName, { pascalCase: true, preserveConsecutiveUppercase: true }),
      exports: 'auto',
      plugins: [terser()]
    }]
  }),
  defineConfig({
    input: 'src/ResizeObserver.ts',
    plugins: [
      empty({
        silent: false,
        file: 'examples/ResizeObserverPolyfill.js'
      }),
      replace({
        preventAssignment: true,
        values: {
          __VERSION__: pkg.version
        }
      }),
      typescript(),
      nodeResolve(),
      commonjs(),
      filesize()
    ],
    output: [{
      file: 'examples/ResizeObserverPolyfill.js',
      format: 'umd',
      name: 'ResizeObserverPolyfill',
      exports: 'auto'
    }]
  })
];
