#! /usr/bin/env node

const {copySync} = require('fs-extra');

const files = [
  copySync('node_modules/animate.css/animate.css', 'src/public/vendor/styles/animate.css'),
  copySync('node_modules/bulma/', 'src/public/vendor/styles/bulma'),
  copySync('node_modules/font-awesome/css/font-awesome.min.css', 'src/public/vendor/styles/font-awesome.min.css'),
  copySync('node_modules/font-awesome/fonts/', 'src/public/vendor/fonts/'),
  copySync('node_modules/dompurify/dist/purify.min.js', 'src/public/vendor/scripts/purify.min.js'),
];

Promise.all(files).catch(err => {
  console.error(err);
  process.exit(1);
});
