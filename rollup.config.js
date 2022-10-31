const resolve = require( '@rollup/plugin-node-resolve');
const commonjs = require( '@rollup/plugin-commonjs');
const typescript = require( 'rollup-plugin-typescript2');
const external = require( 'rollup-plugin-peer-deps-external');
const jsx = require('acorn-jsx')

const packageJson = require('./package.json');

module.exports = {
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      name: 'sui-headless-react'
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true
    }
  ],
  acornInjectPlugins: [jsx()],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript()
  ]
}
