import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'lib/esm/index.js',
    output: {
        name: 'Elapsed_logger',
        file: 'lib/umd/index.js',
        format: 'umd',
        exports: "named",
    },
    plugins: [resolve()]
  };