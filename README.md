# simple-rc

a simple configuration loader

## install

with [npm](https://www.npmjs.com), run

```shell
npm install --save simple-rc
```

## what

given a list of file paths,

- an empty config object is created
- each file path is rendered as a template string with `process.env` passed as local variables
- the contents of each file path is read synchronously
- the contents are assigned deeply into the config object
- the config object is returned

## usage

pass options in js

```js
// config.js
const join = require('path').join

module.exports = require('simple-rc')({
  files: [
    "./config/${NODE_ENV}",
    "./config"
  ]
})
```

or in package.json

```js
// config.js
module.exports = require('simple-rc')()
```

```json
{
  "rc": {
    "files": [
      "./config/${NODE_ENV}",
      "./config"
    ]
  }
}
```

to use in the `browser`, we recommend [`browserify`](http://browserify.org) and [`evalify`](https://www.npmjs.com/package/evalify) transform.

in your package.json, add

```json
{
  "browserify": {
    "transform": [
      [ "evalify", { "files": "config.js" } ]
    ]
  }
}
```

then when you `require` your `config.js` file from within your browser code, it will be exported as only the evaluated object.
