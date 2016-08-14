'use strict'

import Fuse from 'fuse.js'
import chalk from 'chalk'

class BrowserPlugin {
  constructor () {
    this.resultsCount = 0
    this.matchesCount = 0

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
    this.resultsCount = bookmarks.length

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
    this.matchesCount = filteredBookmarks.length

    if (filteredBookmarks.length === 0) {
      console.log(chalk.green(`Searched through ${this.resultsCount} bookmarks`))
      throw new Error(`None matched ""${searchTerm}"`)
    }

    console.log(chalk.green(`Found ${this.matchesCount} matches in ${this.resultsCount} bookmarks`))
    return filteredBookmarks
  }

}

export default BrowserPlugin
