#!/usr/bin/env node
const globby = require('globby')

let errorsFound = []

const KNOWN_FS_TYPOS = [
  'src/gastby-theme-*/**/*.js',
  'src/gastby-plugin-*/**/*.js'
]

const files = globby.sync(KNOWN_FS_TYPOS)

if (files.length) {
  console.log('The following files were encountered with "Gatsby" mispelled as "Gastby"')
  console.log(files)
  errorsFound.push('Gatsby mispelled as Gastby')
}

if (errorsFound.length) {
  console.log('Found', errorsFound.length, errorsFound.length === 1 ? 'error' : 'errors')
  console.log(errorsFound)
} else {
  console.log('No errors found!')
}
