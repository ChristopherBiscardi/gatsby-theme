#!/usr/bin/env node

var program = require("commander");

program
  .version("0.1.0")
  .command("eject", "install one or more packages")
  .command("new [query]", "search with optional query")
  .parse(process.argv);
