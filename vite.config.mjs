import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'vite';
import cp from 'vite-plugin-cp';
import external from 'vite-plugin-external';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs', 'umd'],
      name: 'ResizeObserverPolyfill',
      fileName: '[name]'
    }
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.build.json'
    }),
    external({
      nodeBuiltins: true,
      externalizeDeps: Object.keys(pkg.dependencies)
    }),
    cp({
      targets: [
        {
          src: 'dist/index.umd.js',
          dest: 'examples',
          rename: 'ResizeObserverPolyfill.js'
        }
      ]
    })
  ],
  test: {
    name: 'log-base',
    dir: './test',
    environment: 'node'
  }
});
