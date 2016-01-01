const test = require('tape')
const join = require('path').join
const deepAssign = require('deep-assign')

const getConfig = require('../')

test('getConfig("./config") with NODE_ENV not found', (t) => {
  process.env.NODE_ENV = 'notarealnodeenv'
  const actual = getConfig(join(__dirname, 'config'))
  const expected = require(join(__dirname, 'config'))
  t.deepEqual(actual, expected, 'correct value')
  t.end()
})

test('getConfig("./config") with NODE_ENV', (t) => {
  process.env.NODE_ENV = 'test'
  const actual = getConfig(join(__dirname, 'config'))
  const expected = deepAssign(
    require(join(__dirname, 'config')),
    require(join(__dirname, 'config', 'test'))
  )
  t.deepEqual(actual, expected, 'correct value')
  t.end()
})
