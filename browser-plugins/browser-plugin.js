'use strict'

class BrowserPlugin {
  constructor () {
    if (new.target === BrowserPlugin) {
      throw new TypeError(`Cannot construct abstract BrowserPlugin directly`)
    }

    if (typeof this.load !== `function`) {
      throw new TypeError(`Must override method load()`)
    }
  }
}

export default BrowserPlugin
