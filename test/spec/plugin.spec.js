const path = require('path')

const { assert } = require('chai')
const webpack = require('webpack')
const { merge } = require('webpack-merge')

const runCompiler = require('../lib/runCompiler')
const readFileFromDist = require('../lib/readFileFromDist')

const cleanConfig = require('../boilerplate/webpack.config.js')
const contextConfig = require('../config/context')
const defaultConfig = require('../config/default')

describe('ErudaWebpackPlugin', function () {

  this.timeout(7000)

  it('Should do nothing if the webpack mode is not "development".', async function () {

    const cleanCompiler = webpack(merge(cleanConfig, contextConfig, {
      mode: 'production',
    }))

    const extendCompiler = webpack(merge(cleanConfig, defaultConfig, {
      mode: 'production',
    }))

    await runCompiler(cleanCompiler)
    const cleanContent = readFileFromDist('main.js')
    
    await runCompiler(extendCompiler)
    const extendContent = readFileFromDist('main.js')
    
    assert.strictEqual(cleanContent, extendContent)
  })

  it('Should inject eruda code into .js output files.')
})