# Gatsby Theme

Gatsby theme is an experimental CLI to test UX improvements to the theme creation and usage use cases.

[Warning: Experimental]

## Install and use

```shell
# install
yarn add gatsby-theme

# usage
yarn gatsby-theme eject
```

## Ejecting

This CLI only has one command right now: `gatsby-theme eject`.

Running this will offer up a menu of gatsby plugins and themes that you can choose to eject a file from. Ejecting the file copies it from its location inside `node_modules` to inside the right path in your project (e.g. `src/gatsby-theme-foobar/components/foo.js`) where it will shadow/override the component from the Gatsby theme.

This is better that doing this manually because you don't have to dig around `node_modules` by yourself, and also it automatically rewrites relative imports with a simple heuristic so they still refer back to their unejected parts.

### Copying vs Extending

Once you have selected a file, the CLI asks if you want to "copy" or "extend".

Copying is the most common operation - this copies over all the code so that you can modify any part of it (and rewrites imports as explained above).

Extending is a useful operation which still uses shadowing, but instead of copying over all the code, it just imports it so that you can write useful wrappers around it.

## Creation Livestream

You can watch Chris Biscardi's livestreams making this CLI here:

- [Gatsby Themes: Starting work on the CLI](https://www.youtube.com/watch?v=bGwvp1wWzAs)
- [Gatsby Themes CLI Experiments: Automating new child theme creation](https://www.youtube.com/watch?v=HRpG_hyzPfo)
