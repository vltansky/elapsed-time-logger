export default {
    input: 'lib/esm/index.js',
    output: 'lib/umd/index.js',
    output: {
        name: 'Elapssed-logger',
        file: 'lib/umd/index.js',
        format: 'umd',
        exports: "named",
        globals: {
          'browser-hrtime': 'hrtime',
        }
    },
    external: [ 'browser-hrtime' ]
  };