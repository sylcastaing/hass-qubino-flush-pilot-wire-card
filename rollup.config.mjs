import swc from '@rollup/plugin-swc';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  input: 'src/qubino-flush-wire-pilot.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    nodeResolve({
      extensions: ['.js', '.mjs', '.ts', '.d.ts'],
    }),
    swc({
      swc: {
        minify: true,
      },
    }),
  ],
});
