const join = require('path').join
const deepAssign = require('deep-assign')
const getIn = require('get-in')
const minimist = require('minimist')

module.exports = getConfig

function getConfig (configDirs, argvPath) {
  if (!Array.isArray(configDirs)) {
    configDirs = [configDirs]
  }

  const config = {}

  assignArgs(config, process.argv, argvPath)
  configDirs.forEach(assignConfigFromDir.bind(null, config))

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
