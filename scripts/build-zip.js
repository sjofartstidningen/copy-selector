#!/usr/bin/env node
/* eslint-disable no-console, import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');
const AdmZip = require('adm-zip');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

async function readKey() {
  try {
    const keyPath = path.resolve('key.pem');
    const key = await readFile(keyPath);
    return key;
  } catch (e) {
    throw new Error('key.pem must be present in project root');
  }
}

async function getDirContent(dir) {
  const dirPath = path.resolve(dir);
  const files = await readdir(dirPath);
  return Promise.all(
    files.map(async file => {
      const filePath = path.resolve(dir, file);
      const content = await readFile(filePath);
      return { content, file };
    }),
  );
}

async function zip() {
  try {
    const zipFile = new AdmZip();
    const key = await readKey();
    const files = await getDirContent('copy-selector');

    zipFile.addFile('key.pem', key);
    files.forEach(file => zipFile.addFile(file.file, file.content));

    const zipBuffer = zipFile.toBuffer();
    await writeFile('copy-selector.zip', zipBuffer);

    console.log(chalk.green('Everything zipped up in copy-selector.zip'));
  } catch (e) {
    console.error(chalk.red(e.message));
  }
}

zip();
