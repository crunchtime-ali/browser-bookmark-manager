'use strict'

import Fuse from 'fuse.js'

class BrowserPlugin {
  constructor () {
    // Prevent creating BrowserPlugin
    if (new.target === BrowserPlugin) {
      throw new TypeError(`Cannot construct abstract BrowserPlugin directly`)
    }

    // Check whether the derived class contains all abstract methods
    ['search', 'open', 'getBookmarks'].forEach(requiredMethod => {
      if (typeof this[requiredMethod] !== 'function') {
        throw new TypeError(`Must override method ${requiredMethod}()`)
      }
    })
  }

  search (searchTerm, profile = 'Default') {
    // Gather bookmarks
    const bookmarks = this.getBookmarks(profile)

    let options = {
      // include: ['score'],
      caseSensitive: false,
      shouldSort: true,
      tokenize: false,
      threshold: 0.3,
      location: 0,
      distance: 100,
      keys: ['name', 'value']
    }

    let fuse = new Fuse(bookmarks, options)

    let filteredBookmarks = fuse.search(searchTerm)

    if (filteredBookmarks.length === 0) {
      throw new Error(`No bookmarks have been found`)
    }

    return filteredBookmarks
  }

}

export default BrowserPlugin
