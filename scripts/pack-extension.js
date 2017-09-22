#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies, no-console */
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const chalk = require('chalk');
const ChromeExtension = require('crx');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const fileExists = async p => {
  try {
    const key = await readFile(p);
    return key;
  } catch (e) {
    return false;
  }
};

async function run() {
  const extPath = path.resolve('copy-selector/');
  const keyPath = path.resolve('copy-selector.pem');

  const key = await fileExists(keyPath);
  const attrs = {};
  if (key) attrs.privateKey = key;

  try {
    const crx = new ChromeExtension(attrs);
    const crxBuffer = await crx.load(extPath).then(c => c.pack());
    await writeFile(path.join(__dirname, 'copy-selector.crx'), crxBuffer);

    console.log(chalk.green('Package built'));
  } catch (e) {
    console.error(chalk.red(e));
  }
}

run();
