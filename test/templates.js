const test = require('tape')
const join = require('path').join
const deepAssign = require('deep-assign')

const getConfig = require('../')

test('getConfig("./config/${NODE_ENV}") with no NODE_ENV', (t) => {
  const actual = getConfig({ sources: join(__dirname, 'config', '${NODE_ENV}') })
  const expected = require(join(__dirname, 'config'))
  t.deepEqual(actual, expected, 'correct value')
  t.end()
})

test('getConfig("./config/${NODE_ENV}") with bad NODE_ENV', (t) => {
  process.env.NODE_ENV = 'notarealnodeenv'
  const actual = getConfig({ sources: join(__dirname, 'config', '${NODE_ENV}') })
  const expected = {}
  t.deepEqual(actual, expected, 'correct value')
  t.end()
})

test('getConfig("./config/${NODE_ENV}") with good NODE_ENV', (t) => {
  process.env.NODE_ENV = 'test'
  const actual = getConfig({ sources: join(__dirname, 'config', '${NODE_ENV}') })
  const expected = require(join(__dirname, 'config', 'test'))
  t.deepEqual(actual, expected, 'correct value')
  t.end()
})
