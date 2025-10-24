import serve from 'rollup-plugin-serve';
import swc from '@rollup/plugin-swc';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'eslint/config';

const serveOpts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 8080,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

export default defineConfig({
  input: 'src/qubino-flush-wire-pilot.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    nodeResolve({
      extensions: [".ts", ".js"],
      browser: true,
      preferBuiltins: false,
    }),
    swc(),
    serve(serveOpts),
  ],
});
