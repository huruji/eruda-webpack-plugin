const fs = require('fs');

class ErudaPlugin {
  constructor(
    options = {
      force: false,
      tool: []
    }
  ) {
    this.options = options;
  }

  apply(compiler) {
    const options = this.options;
    if (compiler.options.mode !== 'development' && !options.force) return;
    compiler.hooks.emit.tap('ErudaPlugin', (compilation) => {
      const eruda = fs.readFileSync(require.resolve('eruda'));
      const assets = compilation.assets;

      let initParams = ''
      if (options.tool.length) {
        initParams = {
          tool: options.tool
        }
      }
      return new Promise((resolve) => {
        Object.keys(assets).forEach((e) => {
          if (!/\.js$/.test(e)) return;
          let source = assets[e].source();
          const erudaCode = `\n;(function() {
                        ${eruda};
                        eruda.init(${JSON.stringify(initParams)});
                    })()`;
          source += erudaCode;
          compilation.assets[e].source = () => source;
          compilation.assets[e].size = () => source.length;
        });
        resolve();
      });
    });
  }
}

module.exports = ErudaPlugin;
