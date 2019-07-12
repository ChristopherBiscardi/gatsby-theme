#!/usr/bin/env node

const inquirer = require("inquirer");
const npmKeyword = require("npm-keyword");
const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");

inquirer
  .prompt([
    {
      type: "checkbox",
      name: "themes",
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
  .then(({ themes, childThemeName }) => {
    const pluginsThemePath = path.join(
      process.cwd(),
      "plugins",
      childThemeName
    );
    mkdirp.sync(pluginsThemePath);
    fs.writeFileSync(
      path.join(pluginsThemePath, `gatsby-config.js`),
      `module.exports = {
        plugins: [${themes.map(theme => "`" + theme + "`")}]
    }`
    );
    fs.writeFileSync(
      path.join(pluginsThemePath, `package.json`),
      JSON.stringify(
        {
          name: childThemeName,
          version: "1.0.0"
        },
        null,
        2
      )
    );
    fs.writeFileSync(path.join(pluginsThemePath, `index.js`), "// no-op");
  });
