module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-notes`,
      options: {
        mdx: true,
        basePath: `/notes`,
      },
    },
    // with gatsby-plugin-theme-ui, the last theme in the config
    // will override the theme-ui context from other themes
    { resolve: `gatsby-theme-blog` },
    {
      resolve: `gatsby-plugin-compile-es6-packages`,
      options: {
        modules: [`gatsby-plugin-theme-ui`, `gatsby-theme-blog`],
      },
    },
  ],
  siteMetadata: {
    title: `Shadowed Site Title`,
  },
}
