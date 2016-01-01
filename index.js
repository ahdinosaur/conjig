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
  delete args._
  deepAssign(configAtPath, args)
  return config
}

function assignConfigFromDir (config, dir) {
  const nodeEnv = getNodeEnv()
  const defaults = require(join(dir, 'defaults'))
  const envConfig = require(join(dir, nodeEnv))
  deepAssign(config, defaults, envConfig)
  return config
}

function getNodeEnv () {
  return process.env.NODE_ENV || 'development'
}
