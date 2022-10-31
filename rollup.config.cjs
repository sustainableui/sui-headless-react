const eslint = require('@rollup/plugin-eslint')
const typescript2 = require('rollup-plugin-typescript2')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const jsx = require('acorn-jsx')

const packageJson = require('./package.json')

module.exports = {
  input: 'src/index.tsx',
  output: {
    file: packageJson.main,
    format: 'esm',
    sourcemap: true
  },
  acornInjectPlugins: [jsx()],
  plugins: [
    peerDepsExternal(),
    eslint(),
    typescript2()
  ]
}
