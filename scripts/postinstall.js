#! /usr/bin/env node

// TODO: copy only needed files rather than entire directories

const {copySync} = require('fs-extra');

const files = [
  copySync('node_modules/animate.css', 'src/public/vendor/animate.css'),
  copySync('node_modules/bulma', 'src/public/vendor/bulma'),
  copySync('node_modules/dompurify', 'src/public/vendor/dompurify'),
  copySync('node_modules/font-awesome', 'src/public/vendor/font-awesome'),
];

Promise.all(files).catch(err => {
  console.error(err);
  process.exit(1);
});
