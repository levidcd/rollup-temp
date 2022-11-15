import config from './config/rollup-config'
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'
export default config({
  input: './src/index.ts',
  output: [
    {
      name: 'bm-sentry',
      format: 'umd',
      file: 'dist/index.umd.js',
      sourcemap: true,
      globals: {
        lodash: 'lodash'
      }
    }
  ],
  external: ['lodash'],
  plugins: [optimizeLodashImports()]
})
