import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: ['src/qubino-flush-wire-pilot.ts'],
  output: {
    dir: './dist',
    format: 'es',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
    typescript(),
    babel({
      exclude: 'node_modules/**',
    }),
    terser(),
  ],
};
