const join = require('path').join
const deepAssign = require('deep-assign')
const getIn = require('get-in')
const minimist = require('minimist')
const loadPackage = require('load-pkg')
const defined = require('defined')
const Path = require('path')
const merge = require('lodash.merge')
const uniq = require('lodash.uniq')

module.exports = getConfig

function getConfig (options) {
  options = merge(
    loadPackage.sync().rc,
    options,
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
  options.files = uniq(options.files.map(function (path) {
    return Path.resolve(process.cwd(), path)
  }))

  const config = {}

  assignArgs(config, process.argv, options.path)
  options.files.forEach(assignConfigFromDir.bind(null, config))

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

function assignConfigFromDir (config, dir) {
  deepAssign(config,
    tryRequire(join(dir), {})
  )
  const nodeEnv = getNodeEnv()
  if (nodeEnv != null) {
    deepAssign(config,
      tryRequire(join(dir, nodeEnv), {})
    )
  }
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
