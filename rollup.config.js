import pkg from './package.json';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'elapsedLogger',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      file: 'lib/elapsed-time-logger.min.js',
      format: 'umd',
      name: 'elapsedLogger',
      plugins: [terser()],
    },
  ],
  watch: {
    include: 'src/**',
  },
  external: [
    // 'browser-hrtime',
    // ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'es2015',
        },
      },
      useTsconfigDeclarationDir: true,
    }),
    resolve(),
  ],
};
