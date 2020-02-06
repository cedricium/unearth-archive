require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`, // or '.env'
})

module.exports = {
  siteMetadata: {
    title: `Unearth - Like Timehop for Reddit Saves`,
    description: `Unearth aims to be the best service to help Redditors rediscover the things they have saved through the use of active reminders.`,
    author: `@cedricamaya`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `Unearth`,
        start_url: `/`,
        background_color: `#FF3E6C`,
        theme_color: `#FF3E6C`,
        display: `minimal-ui`,
        icon: `src/images/unearth-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Heebo`,
            subsets: [`latin`],
            variants: [`400`, `700`, `800`],
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
