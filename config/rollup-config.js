import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'

const extensions = ['.js', '.ts']
export default (config) => {
  const { plugins = [], ...others } = config
  return {
    input: './src/index.ts',
    plugins: [
      typescript({
        outputToFilesystem: false,
        declaration: false
      }),
      resolve(),
      commonjs(),
      // replace({
      //   preventAssignment: true,
      //   'process.env.NODE_ENV': JSON.stringify('production')
      // }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions
      }),
      terser(),
      filesize(),
      ...plugins
    ],
    ...others
  }
}
