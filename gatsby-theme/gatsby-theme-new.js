#!/usr/bin/env node

const inquirer = require("inquirer");
const npmKeyword = require("npm-keyword");
const mkdirp = require("mkdirp");
const path = require("path");

inquirer
  .prompt([
    {
      type: "list",
      name: "theme",
      message: "What parent theme are you trying to child theme?",
      choices: async () => {
        const possibleThemes = await npmKeyword.names("gatsby-theme");
        return possibleThemes;
      }
    },
    {
      type: "input",
      name: "childThemeName",
      message: "What would you like to call your child theme?"
    }
  ])
  .then(({ theme, childThemeName }) => {
    const pluginsThemePath = path.join(
      process.cwd(),
      "plugins",
      childThemeName
    );
    console.log(pluginsThemePath);
    mkdirp.sync(pluginsThemePath);
    console.log(theme);
  });
