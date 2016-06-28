const fromString = require('from2-string')
const staticModule = require('static-module')

const getConfig = require('./')

module.exports = createTransform

function createTransform (filename, options) {
  return staticModule({
    conjig: function (options) {
      const config = getConfig(options)
      return fromString(
        JSON.stringify(
          config  
        )    
      )
    }
  })
}
