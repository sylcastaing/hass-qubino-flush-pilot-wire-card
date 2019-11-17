import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import serve from 'rollup-plugin-serve';

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
    serve({
      contentBase: './dist',
      host: '0.0.0.0',
      port: 5000,
      allowCrossOrigin: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }),
  ],
};
