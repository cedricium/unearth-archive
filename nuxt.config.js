module.exports = {
  head: {
    description: 'Unearth helps you manage saved posts from various sites and services like Reddit, YouTube, and more.',
    link: [
      { rel: 'stylesheet', href: 'https://www.launchaco.com/static/AllTemplates.min.css' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-pick.ico' },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
      {
        hid: 'fb:app_id',
        property: 'fb:app_id',
        content: '621649061570144'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'unearth · the original saved posts management tool'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Unearth helps you manage saved posts from various sites and services like Reddit, YouTube, and more.'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://www.tryunearth.com/images/social-graphic.png'
      },
      {
        hid: 'og:image:width',
        property: 'og:image:width',
        content: '1200'
      },
      {
        hid: 'og:image:height',
        property: 'og:image:height',
        content: '630'
      },
      {
        hid: 'og:image:alt',
        property: 'og:image:alt',
        content: 'Contains the "unearth" branding the description on a dark background.'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://www.tryunearth.com'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: '@tryunearth'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'unearth · the original saved posts management tool'
      },
      {
        hid: 'twitter:description',
        property: 'twitter:description',
        content: 'Unearth helps you manage saved posts from various sites and services like Reddit, YouTube, and more.'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: 'https://www.tryunearth.com/images/social-graphic.png'
      },
      {
        hid: 'twitter:image:alt',
        property: 'twitter:image:alt',
        content: 'Contains the "unearth" branding the description on a dark background.'
      },
    ]
  },
  serverMiddleware: [
    'redirect-ssl',
    '~/middleware/redirect-to-www'
  ],
  srcDir: 'src'
};
