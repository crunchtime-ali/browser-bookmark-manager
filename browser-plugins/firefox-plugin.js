import childProc from 'child_process'
import fs from 'fs'
import os from 'os'
import sql from 'sql.js'

import BrowserPlugin from './browser-plugin'

// Determine Chrome config location
let dir
if (os.type() === 'Darwin') {
  dir = `${os.homedir()}/Library/Application Support/Firefox/Profiles/64r0cbin.default`
}
const filename = 'places.sqlite'

class FirefoxPlugin extends BrowserPlugin {

  async search (searchTerm) {
    console.time("readfile");
    var filebuffer = fs.readFileSync(`${dir}/${filename}`);
    console.timeEnd("readfile")

    console.time("dbopen")
    var db = new sql.Database(filebuffer)
    console.timeEnd("dbopen")
    console.time("dbselect")
    var res = db.exec("SELECT type, fk, parent, position, moz_bookmarks.title FROM moz_bookmarks INNER JOIN moz_places ON moz_bookmarks.fk = moz_places.id");
console.timeEnd("dbselect")
    console.log(res[0].values)
    /*
    console.log("search triggered")
    console.log("trying to open", `${dir}/${filename}`)
    var db = await new sqlite.Database(`${dir}/${filename}`, sqlite.OPEN_READONLY, () => {
      console.log("callback hell",db)
    })
    //await sqlite.open(`${dir}/${filename}`)
    console.log("jo", db)*/
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
