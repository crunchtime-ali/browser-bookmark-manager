import childProc from 'child_process'
import fs from 'fs'
import os from 'os'
import sqlite from 'sqlite3'

import BrowserPlugin from './browser-plugin'

// Determine Chrome config location
let dir
console.log(os.type())
if (os.type() === 'Darwin') {
  dir = `${os.homedir()}/Library/Application Support/Firefox/Profiles/64r0cbin.default`
}
const filename = 'places.sqlite'

class FirefoxPlugin extends BrowserPlugin {

  async search (searchTerm) {
    console.log("search triggered")
    console.log("trying to open", `${dir}/${filename}`)
    var db = await new sqlite.Database(`${dir}/${filename}`, sqlite.OPEN_READONLY, () => {
      console.log("callback hell",db)
    })
    //await sqlite.open(`${dir}/${filename}`)
    console.log("jo", db)
    // Yes we can use synchronous code here because the file needs to be loaded before something will happen anyways
    /*const data = fs.readFileSync(dir, 'utf8')

    var obj = JSON.parse(data)
    const bookmarkItems = obj.roots.bookmark_bar.children

    // Filter all entries
    let filtered = []
    bookmarkItems.forEach(item => {
      if (item.type === 'url' && (item.url.includes(searchTerm) || item.name.includes(searchTerm))) {
        filtered.push({
          name: item.name,
          value: item.url
        })
      }
    })
    return filtered.slice(1)*/
  }

  open (url) {
    childProc.exec(`open -a "Firefox" "${url}"`)
  }
}

export default FirefoxPlugin
