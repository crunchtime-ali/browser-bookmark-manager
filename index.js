#!/usr/bin/env node

import program from 'commander'
import os from 'os'
import fs from 'fs'
import inquirer from 'inquirer'
import childProc from 'child_process'
import * as plugins from './browser-plugins/index'

console.log(plugins)

program
  .version('0.0.1')
  .usage('[options] <file ..>')
  .option('-b, --browser [browsername]', 'specified type of browser [chrome]', 'chrome')
  .parse(process.argv)

const searchTerms = program.args

// Make sure that only one search term is specified
if (searchTerms.length !== 1) {
  program.outputHelp()
  process.exit(0)
}

console.log(searchTerms[0])

// Yes we can use synchronous code here because the file needs to be loaded before something will happen anyways
const data = fs.readFileSync(`${os.homedir()}/Library/Application Support/Google/Chrome/Default/Bookmarks`, 'utf8')

var obj = JSON.parse(data)
const bookmarkItems = obj.roots.bookmark_bar.children

// Filter all entries
let filtered = []
bookmarkItems.forEach(item => {
  if (item.type === 'url' && (item.url.includes(searchTerms[0]) || item.name.includes(searchTerms[0]))) {
    filtered.push({
      name: item.name,
      value: item.url
    })
  }
})

inquirer.prompt([
  {
    type: 'list',
    name: 'url',
    message: 'Which bookmark do you want to open?',
    choices: filtered
  }
]).then(function (answers) {
  childProc.exec(`open -a "Google Chrome" "${answers.url}"`)
  console.log(`Opening ${answers.url}`)
})
