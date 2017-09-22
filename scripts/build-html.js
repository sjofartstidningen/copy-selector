#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function copyHtml() {
  try {
    const srcPath = (name = '') => path.resolve('src', name);
    const destPath = (name = '') => path.resolve('copy-selector', name);

    const srcDir = await readdir(srcPath());
    const htmlFiles = srcDir.filter(file => file.includes('.html'));

    await Promise.all(
      htmlFiles.map(file => copyFile(srcPath(file), destPath(file))),
    );

    console.log(chalk.green('Successfully built html'));
    process.exit();
  } catch (e) {
    console.error(chalk.red(e.message));
    process.exit(1);
  }
}

copyHtml();
