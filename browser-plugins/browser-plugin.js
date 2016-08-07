'use strict'

class BrowserPlugin {
  constructor () {
    if (new.target === BrowserPlugin) {
      throw new TypeError(`Cannot construct abstract BrowserPlugin directly`)
    }

    // Check whether the derived class contains all abstract methods
    ['search', 'open'].forEach(requiredMethod => {
      if (typeof this[requiredMethod] !== 'function') {
        throw new TypeError(`Must override method ${requiredMethod}()`)
      }
    })
  }
}

export default BrowserPlugin
