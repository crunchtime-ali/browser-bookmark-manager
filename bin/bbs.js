#!/usr/bin/env node

import program from 'commander'
import inquirer from 'inquirer'
import * as plugins from '../browser-plugins/index'
import {version} from '../package.json'

const currentPlugin = new plugins.ChromePlugin()
//const currentPlugin = new plugins.FirefoxPlugin()

program
  .version(version)
  .usage('[options] <file ..>')
  .option('-b, --browser [browsername]', 'specified type of browser [chrome]', 'chrome')
  .parse(process.argv)

const searchTerms = program.args

// Make sure that only one search term is specified
if (searchTerms.length !== 1) {
  program.outputHelp()
  process.exit(0)
}

// Perform the search for the actual bookmark
const results = currentPlugin.search(searchTerms[0])

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
