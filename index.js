#!/usr/bin/env node

const program = require('commander')
const fs = require('fs')
const os = require('os')
const inquirer = require('inquirer')
const childProc = require('child_process')

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
console.log(searchTerms)

fs.readFile(`${os.homedir()}/Library/Application Support/Google/Chrome/Default/Bookmarks`, 'utf8', (err, data) => {
  if (err) throw err
  var obj = JSON.parse(data)
  const bookmarkItems = obj.roots.bookmark_bar.children

  /*var filtered = bookmarkItems.filter((item) => {
    return item.type === 'url' &&
      (item.url.includes(searchTerms[0]) || item.name.includes(searchTerms[0]))
  })*/

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
})
