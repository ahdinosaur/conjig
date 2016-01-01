const test = require('tape')
const join = require('path').join

const getConfig = require('../')

test('getConfig("./config")', () => {
  const config = getConfig(join(__dirname, 'config'))

  console.log("config", config)
})
