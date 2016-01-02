const join = require('path').join
const deepAssign = require('deep-assign')
const getIn = require('get-in')
const minimist = require('minimist')
const callerPath = require('caller-path')
const pkgConf = require('pkg-conf')
const defined = require('defined')
const Path = require('path')
const merge = require('lodash.merge')
const uniq = require('lodash.uniq')
const render = require('es6-template').render

module.exports = getConfig

function getConfig (options) {
  const pkgOptions = pkgConf.sync('rc', callerPath())
  const cwd = Path.dirname(pkgConf.filepath(pkgOptions))

  options = merge(
    { env: deepAssign({}, process.env) },
    pkgOptions,
    defined(options, {}),
    function (a, b) {
      if (Array.isArray(a)) {
        return a.concat(b)
      }
    }
  )

  options.files = defined(options.files, [])
  if (!Array.isArray(options.files)) {
    options.files = [options.files]
  }
  options.files = uniq(options.files.map(function (pathTemplate) {
    const path = render(pathTemplate, options.env)
    return Path.resolve(cwd, path)
  }))

  const config = {}

  assignArgs(config, process.argv, options.path)
  options.files.forEach(assignConfigFromFile.bind(null, config))

  return config
}

function assignArgs (config, argv, path) {
  if (path == null) { path = [] }
  var configAtPath = getIn(config, path)
  var args = minimist(argv.slice(2))
  // we don't want the positional arguments
  delete args._
  deepAssign(configAtPath, args)
  return config
}

function assignConfigFromFile (config, file) {
  deepAssign(config,
    tryRequire(join(file), {})
  )
  return config
}

function getNodeEnv () {
  return process.env.NODE_ENV
}

// TODO split into `tryToRequire` module
function tryRequire (path, fallback) {
  try {
    return require(path)
  } catch (err) {
    if (err.code === "MODULE_NOT_FOUND") {
      return fallback
    } else {
      throw err
    }
  }
}
