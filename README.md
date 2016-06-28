# conjig [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][6]][7] [![js-standard-style][8]][9]

a minimal [universal](#browser) configuration loader

```shell
npm install --save conjig
```

## what

you want to synchronously load a configuration object.

the configuration should be composed of many sources.

[![dna](https://upload.wikimedia.org/wikipedia/commons/8/87/DNA_orbit_animated_small.gif)](https://commons.wikimedia.org/wiki/File%3ADNA_orbit_animated_small.gif)

## install

with [npm](https://www.npmjs.com), run

```shell
npm install --save conjig
```

## example

pass options in js

```js
// config.js
const getConfig = require('conjig')

module.exports = getConfig({
  sources: [
    "./config/${NODE_ENV}",
    "./config"
  ]
})
```

or in package.json

```js
// config.js
const getConfig = require('conjig')

module.exports = getConfig()
```

```json
{
  "conjig": {
    "sources": [
      "./config/${NODE_ENV}",
      "./config"
    ]
  }
}
```

## usage

### `getConfig = require('conjig')`

### `config = getConfig(options)`

`options` is an object with:

- `sources`: an array of filenames
  - may include template string variables from `process.env`

`config` is an object deeply merged with all config objects in sources.

## browser

to use in the `browser`, use the [`browserify`](http://browserify.org) compiler.

in your package.json, add

```json
{
  "browserify": {
    "transform": [
      "conjig/transform"
    ]
  }
}
```

then when you call `require('conjig')()` in the browser, it transforms to the result in node during compilation.

## license

The Apache License

Copyright &copy; 2016 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/conjig.svg?style=flat-square
[3]: https://npmjs.org/package/conjig
[4]: https://img.shields.io/travis/ahdinosaur/conjig/master.svg?style=flat-square
[5]: https://travis-ci.org/ahdinosaur/conjig
[6]: http://img.shields.io/npm/dm/conjig.svg?style=flat-square
[8]: https://npmjs.org/package/conjig
[8]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[9]: https://github.com/feross/standard
