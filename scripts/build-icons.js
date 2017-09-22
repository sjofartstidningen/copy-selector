#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const copyFile = promisify(fs.copyFile);

async function copyHtml() {
  try {
    const srcPath = (name = '') => path.resolve('icons', name);
    const destPath = (name = '') => path.resolve('copy-selector', name);

    const srcDir = await readdir(srcPath());
    const icons = srcDir.filter(file => file.includes('.png'));

    await Promise.all(
      icons.map(file => copyFile(srcPath(file), destPath(file))),
    );

    console.log(chalk.green('Successfully built icons'));
    process.exit();
  } catch (e) {
    console.error(chalk.red(e.message));
    process.exit(1);
  }
}

copyHtml().catch(e => console.error(e));
