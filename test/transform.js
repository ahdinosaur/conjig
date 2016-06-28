const fs = require('fs')
const join = require('path').join
const test = require('tape')
const bufferList = require('bl')
const createTranspiler = require('transpilify')

test('transform transpiles through', function (t) {

  const cwd = process.cwd()
  process.chdir(__dirname)

  const transpiler = createTranspiler({
    transform: [require('../transform')],
    basedir: __dirname
  })

  const expected = fs.readFileSync(join(__dirname, './sink.js'), 'utf8')

  transpiler(__dirname + '/source.js')
    .pipe(bufferList(function (err, data) {
      t.notOk(err, 'no error')
      const actual = data.toString()
      t.equal(actual, expected, 'sink is transformed source')

      process.chdir(cwd)
      t.end()
    }))
})
