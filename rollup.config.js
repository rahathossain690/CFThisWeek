/* eslint-env node */

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import zip from 'rollup-plugin-zip'
import { emptyDir } from 'rollup-plugin-empty-dir'

import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'

const p = process.env.NODE_ENV === 'production'

export default {
  input: ['src/manifest.json'],
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    // always put chromeExtension() before other plugins
    chromeExtension(),
    // includes an automatic reloader in watch mode
    simpleReloader(),
    // resolves node modules
    resolve(),
    // converts libraries that use commonjs
    commonjs(),
    // empties the dist for each build
    emptyDir(),
    // creates a zip to upload to the Chrome Web Store :)
    p && zip({ dir: 'releases' }),
  ],
}
