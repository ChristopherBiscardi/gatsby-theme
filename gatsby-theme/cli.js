#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const glob = require("glob");
const mkdirp = require("mkdirp");
const { sortBy, uniq } = require("lodash");
const loadThemes = require("gatsby/dist/bootstrap/load-themes");

var inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      name: "theme",
      message: "What theme are you trying to eject from?",
      choices: async () => {
        const config = require(path.join(
          process.cwd(),
          "gatsby-config.js"
        ), "utf-8");

        const configWithThemes = await loadThemes(config, {
          useLegacyThemes: false
        });

        return sortBy(
          uniq(configWithThemes.config.plugins.map(({ resolve }) => resolve))
        );
      }
    },
    {
      type: "list",
      name: "component",
      message: "Select the file you would like to shadow:",
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
