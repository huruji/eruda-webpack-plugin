const webpack = require('webpack')
const { merge } = require('webpack-merge')

const cleanConfig = require('../boilerplate/webpack.config.js')
const defaultConfig = require('../config/default')

describe('ErudaWebpackPlugin', () => {

  it('Should do nothing if the webpack mode is not "development".', async () => {
    const cleanCompiler = webpack(cleanConfig)
    const extendCompiler = webpack(merge(cleanConfig, defaultConfig, {
      mode: 'production'
    }))

    await runCompiler(cleanCompiler)
    const cleanContent = readFileSync('../boilerplate/dist/main.js')
    
    await runCompiler(extendCompiler)
    const extendContent = readFileSync('../boilerplate/dist/main.js')
    
    assert.strictEqual(cleanContent, extendContent)
  })

  it('Should inject eruda code into .js output files.')
})