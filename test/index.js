const test = require('tape')

const getConfig = require('../')

test('getConfig with package defaults', function (t) {
  const cwd = process.cwd()
  process.chdir(__dirname)

  const actual = getConfig()
  const expected = Object.assign(
    {},
    require('./config/a'),
    require('./config/b')
    )
  t.deepEqual(actual, expected)

  process.chdir(cwd)
  t.end()
})
