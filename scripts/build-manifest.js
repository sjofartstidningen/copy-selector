#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const manifest = require('../manifest.json');
const pkg = require('../package.json');

const isDev = process.env.NODE_ENV === 'production';

const newManifest = Object.assign({}, manifest, {
  version: pkg.version,
});

const manifestPath = path.join(__dirname, '..', 'copy-selector', 'manifest.json');
fs.writeFile(manifestPath, JSON.stringify(newManifest, null, 2), err => {
  if (err) {
    console.error(chalk.red(err.message));
    process.exit(1);
  }

  console.log(chalk.green('Successfully created manifest'));
  process.exit(0);
});
