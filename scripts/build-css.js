#!/usr/bin/env node
/* eslint-disable no-console, import/no-extraneous-dependencies */
require('babel-register')({
  presets: [require.resolve('babel-preset-env')],
});
const sass = require('node-sass');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const renderSass = promisify(sass.render);

async function buildCss(conf) {
  const start = Date.now();
  const srcPath = path.resolve(conf.input);
  const buildPath = path.resolve(conf.output);

  const { css, stats } = await renderSass({ file: srcPath });
  await writeFile(buildPath, css);

  const dur = Date.now() - start;
  console.log(chalk.cyan.bold(`\n${conf.input} → ${conf.output}...`));
  console.log(
    chalk.green(
      `created ${chalk.bold(conf.output)} in ${chalk.bold(`${dur}ms`)}\n`,
    ),
  );
  return stats;
}

async function run(conf) {
  try {
    await Promise.all(conf.map(c => buildCss(c)));
  } catch (e) {
    console.error(chalk.red(e.message));
  }
}

run(require('../sass.config').default);
