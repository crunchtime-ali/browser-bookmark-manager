import childProc from 'child_process'
import fs from 'fs'
import os from 'os'
import path from 'path'

import sql from 'sql.js'
import ini from 'ini'

import BrowserPlugin from './browser-plugin'

// Determine Firefox config location
let dir
if (os.type() === 'Darwin') {
  dir = `${os.homedir()}/Library/Application Support/Firefox`
} else if (os.type() === 'Windows_NT') {
  dir = path.join(os.homedir(), 'AppData', 'Roaming', 'Mozilla', 'Firefox')
} else if (os.type() === 'Linux') {
  dir = path.join(os.homedir(), '.mozilla', 'firefox')
}

const iniName = 'profiles.ini'
const filename = 'places.sqlite'

class FirefoxPlugin extends BrowserPlugin {

  /**
   * Retrieves the location of `profileToSearch`
   * @param  {string} profileToSearch Name of profile
   * @return {string}                 local path to profile
   */
  getProfileLocation (profileToSearch) {
    const iniBuffer = fs.readFileSync(path.join(dir, iniName), 'utf8')
    const iniObj = ini.decode(iniBuffer)

    for (let profileId in iniObj) {
      let profile = iniObj[profileId]
      // Check whether this config item is a profile at all
      if (profile['Name'] !== undefined) {
        if (profileToSearch === 'Default' || profileToSearch.toLowerCase() === profile['Name'].toLowerCase()) {
          return path.join(dir, profile.Path)
        }
      }
    }

    throw new Error(`The profile ${profileToSearch} could not be found!`)
  }

  getBookmarks (profile) {
    let profilePath = this.getProfileLocation(profile)
    let bookmarks = []
    const filebuffer = fs.readFileSync(path.join(profilePath, filename))
    var db = new sql.Database(filebuffer)
    db.each(`SELECT moz_bookmarks.title as name, moz_places.url as value
             FROM moz_bookmarks
             INNER JOIN moz_places ON moz_bookmarks.fk = moz_places.id
             WHERE url NOT LIKE "place:%"`, (obj) => {
      bookmarks.push(obj)
    })
    return bookmarks
  }

  open (url) {
    if (os.type() === 'Darwin') {
      childProc.exec(`open -a "Firefox" "${url}"`)
    } else if (os.type() === 'Windows_NT') {
      childProc.exec(`start firefox "${url}"`)
    } else if (os.type() === 'Linux') {
      childProc.exec(`firefox "${url}"`)
    }
  }
}

export default FirefoxPlugin
