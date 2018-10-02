module.exports = {
  css: [
    // { src: 'bulma/bulma.sass', lang: 'sass' },
    // { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' }
  ],
  serverMiddleware: [
    'redirect-ssl',
    '~/middleware/redirect-to-www'
  ],
  srcDir: 'src/'
};
