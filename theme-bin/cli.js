#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const glob = require("glob");
var mkdirp = require("mkdirp");

var inquirer = require("inquirer");

const plugins = require(path.join(
  process.cwd(),
  "gatsby-config.js"
), "utf-8").plugins.map(plugin => (plugin.resolve ? plugin.resolve : plugin));

inquirer
  .prompt([
    {
      type: "list",
      name: "theme",
      message: "What theme are you trying to eject from?",
      choices: plugins
    },
    {
      type: "list",
      name: "component",
      message: "Select the letter contained in your name:",
      choices: ({ theme }) => {
        const themeSrc = path.join(path.dirname(require.resolve(theme)), `src`);
        return glob.sync(`**/*`, {
          cwd: themeSrc
        });
      }
    },
    {
      type: "list",
      name: "shadowType",
      message: "Would you like to copy or extend?",
      choices: [`copy`, `extend`]
    }
  ])
  .then(({ theme, component, shadowType }) => {
    const componentPath = path.dirname(component);
    mkdirp.sync(path.join(process.cwd(), "src", theme, componentPath));
    const finalPath = path.join(process.cwd(), "src", theme, component);

    if (shadowType === "copy") {
      fs.copyFileSync(
        path.join(path.dirname(require.resolve(theme)), "src", component),
        finalPath
      );
    } else if (shadowType === "extend") {
      fs.writeFileSync(
        finalPath,
        `import Component from '${theme}/src/${component}';
        export default props => <Component {...props}/>`
      );
    }
  });
