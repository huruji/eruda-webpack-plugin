const camelCase = require('camel-case')
const path = require('path')
const loadModule = require('./loadModule')

let injected =false;
class ErudaPlugin {
  constructor(options = {}) {
    this.options = Object.assign(
      {
        force: false,
        tool: [],
        plugins: [],
        entry: [],
        filters: [],
        injectOnlyOnce: true
      },
      options
    )
  }

  apply(compiler) {
    const options = this.options
    if (compiler.options.mode !== 'development' && !options.force) return
    if (compiler.hooks) {
      compiler.hooks.emit.tap('ErudaPlugin', (compilation) => {
        this.resolve(compilation)
        return Promise.resolve()
      })
    } else {
      compiler.plugin('emit', (compilation, cb) => {
        this.resolve(compilation)
        return cb()
      })
    }
  }

  addPlugin() {
    const plugins = this.options.plugins
    let pluginsStr = ''

    Array.from(plugins).forEach((p) => {
      let plugin = p
      if (typeof plugin === 'string') {
        if (!plugin.startsWith('eruda')) plugin = `eruda-${plugin}`
        pluginsStr += `${loadModule(plugin, {
          paths: [process.cwd(), path.resolve(__dirname, '..')]
        })}
            eruda.add(${camelCase(plugin)});
            `
      }
    })
    return pluginsStr
  }

  resolve(compilation) {
    const options = this.options
    const filters = Array.isArray(options.filters) ? options.filters : [options.filters]
    const entry = Array.isArray(options.entry) ? options.entry : [options.entry]
    const eruda = loadModule('eruda')
    const assets = compilation.assets

    let initParams = ''
    if (options.tool.length) {
      initParams = {
        tool: options.tool
      }
    }

    const plugins = this.addPlugin()
    Object.keys(assets).forEach((asset) => {
      if (entry.length) {
        const isMatched = entry.some(en => en.test(asset))
        if (!isMatched) return
      } else if (filters.length) {
        const isMatched = filters.some(e => !e.test(asset))
        if (!isMatched) return
      }
      if (!/\.js$/.test(asset)) return

      if (this.options.injectOnlyOnce) {
        if (!injected) {
          //injecting to asset
          injected = true;
        } else {
          //injected, ignore asset
          return;
        }
      }
      let source = assets[asset].source()
      const erudaCode = `\n;(function() {
                      ${eruda};
                      if(!eruda._isInit) eruda.init(${JSON.stringify(initParams)});
                      ${plugins}
                  })()`
      source += erudaCode
      compilation.assets[asset].source = () => source
      compilation.assets[asset].size = () => source.length
    })
  }
}

module.exports = ErudaPlugin
