#!/usr/bin/env node

import program from 'commander'
import inquirer from 'inquirer'
import * as plugins from '../browser-plugins/index'
import {version} from '../package.json'

program
  .version(version)
  .usage('[options] <file ..>')
  .option('-b, --browser [browsername]', 'specified type of browser [chrome]', 'chrome')
  .option('-p, --profile [profilename]', 'name of browsers user profile', 'Default')
  .parse(process.argv)

program.browser = program.browser.toLowerCase()
const browserClass = plugins.browserNames[program.browser]

// Exit if an invalid browser was chosen
if (browserClass === undefined) {
  errorExit(`'${program.browser}' is not a valid browser name. The available browsernames are...`)
}

const currentPlugin = new plugins[browserClass]()
const searchTerms = program.args

// Make sure that only one search term is specified
if (searchTerms.length !== 1) {
  program.outputHelp()
  process.exit(0)
}

// Perform the search for the actual bookmarks
let results
try {
  results = currentPlugin.search(searchTerms[0], program.profile)
} catch (err) {
  errorExit(err.toString())
}

inquirer.prompt([
  {
    type: 'list',
    name: 'url',
    message: 'Which bookmark do you want to open?',
    choices: results
  }
]).then(function (answers) {
  currentPlugin.open(answers.url)
  console.log(`Opening ${answers.url}`)
})

function errorExit (message) {
  console.log(message)
  process.exit(0)
}
