# conjig

a minimal configuration loader

## install

with [npm](https://www.npmjs.com), run

```shell
npm install --save conjig
```

[![dna](https://upload.wikimedia.org/wikipedia/commons/8/87/DNA_orbit_animated_small.gif)](https://commons.wikimedia.org/wiki/File%3ADNA_orbit_animated_small.gif)

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

module.exports = require('conjig')({
  files: [
    "./config/${NODE_ENV}",
    "./config"
  ]
})
```

or in package.json

```js
// config.js
module.exports = require('conjig')()
```

```json
{
  "conjig": {
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
[2]: https://img.shields.io/npm/v/inu.svg?style=flat-square
[3]: https://npmjs.org/package/inu
[4]: https://img.shields.io/travis/ahdinosaur/inu/master.svg?style=flat-square
[5]: https://travis-ci.org/ahdinosaur/inu
[6]: https://img.shields.io/codecov/c/github/ahdinosaur/inu/master.svg?style=flat-square
[7]: https://codecov.io/github/ahdinosaur/inu
[8]: http://img.shields.io/npm/dm/inu.svg?style=flat-square
[9]: https://npmjs.org/package/inu
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
