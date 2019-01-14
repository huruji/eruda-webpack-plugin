const camelCase = require('camel-case')
const path = require('path')
const loadModule = require('./loadModule')

class ErudaPlugin {
  constructor(
    options = {
      force: false,
      tool: [],
      plugins: []
    }
  ) {
    this.options = options;
  }

  apply(compiler) {
    const options = this.options;
    if (compiler.options.mode !== 'development' && !options.force) return;
    compiler.hooks.emit.tap('ErudaPlugin', (compilation) => {
      const eruda = loadModule('eruda')
      const assets = compilation.assets;

      let initParams = ''
      if (options.tool.length) {
        initParams = {
          tool: options.tool
        }
      }

      const plugins = this.addPlugin();
      return new Promise((resolve) => {
        Object.keys(assets).forEach((e) => {
          if (!/\.js$/.test(e)) return;
          let source = assets[e].source();
          const erudaCode = `\n;(function() {
                        ${eruda};
                        eruda.init(${JSON.stringify(initParams)});
                        ${plugins}
                    })()`;
          source += erudaCode;
          compilation.assets[e].source = () => source;
          compilation.assets[e].size = () => source.length;
        });
        resolve();
      });
    });
  }

  addPlugin() {
    const plugins = this.options.plugins;
    let pluginsStr = ''

    Array.from(plugins).forEach((p) => {
      let plugin = p
      if (typeof plugin === 'string') {
        if (!plugin.startsWith('eruda')) plugin = `eruda-${plugin}`;
        pluginsStr += `${loadModule(plugin, {
          paths: [process.cwd(), path.resolve(__dirname, '..')]
        })}
            eruda.add(${camelCase(plugin)});
            `
      }
    })
    return pluginsStr
  }
}

module.exports = ErudaPlugin;
