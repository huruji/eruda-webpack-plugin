class WebpackCompilationError extends Error {
  constructor(stats) {
    super()
    const error = stats.toJson().errors[0]
    Object.assign(this, error)
  }
}

async function runCompiler(compiler) {

  return (new Promise((resolve, reject) => {

    compiler.run((err, stats) => {
      try {

        if (err) throw err
        if (stats.hasErrors()) throw new WebpackCompilationError(stats)

        compiler.close((closeErr) => !closeErr || reject(closeErr))
        resolve()

      } catch (error) {
        compiler.close((closeErr) => !closeErr || reject(closeErr))
        reject(error)
      }
    })
  }))
}

module.exports = runCompiler