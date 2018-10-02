module.exports = {
  serverMiddleware: [
    'redirect-ssl',
    '~/middleware/redirect-to-www'
  ],
  srcDir: 'src/'
};
