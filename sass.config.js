/* eslint-disable no-console, import/no-extraneous-dependencies */
const sass = require('node-sass');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const writeFile = promisify(fs.writeFile);
const render = promisify(sass.render);

async function writeCss(parsed) {
  const data = parsed.map(parsedFile => {
    const { name } = path.parse(parsedFile.stats.entry);
    const newPath = path.join(__dirname, 'copy-selector', `${name}.css`);
    return { css: parsedFile.css, path: newPath, name };
  });

  await Promise.all(data.map(d => writeFile(d.path, d.css)));
  return data;
}

async function run() {
  try {
    const srcPath = (file = '') => path.resolve(__dirname, 'src', file);
    const srcContent = await readdir(srcPath());
    const cssFiles = srcContent.filter(file => file.includes('.scss'));

    const parsed = await Promise.all(
      cssFiles.map(file =>
        render({
          file: srcPath(file),
        }),
      ),
    );

    const data = await writeCss(parsed);

    console.log(
      chalk.green(
        `Succesfully wrote ${data.length} files to disk (${data
          .map(d => `${d.name}.css`)
          .join(', ')})`,
      ),
    );
  } catch (e) {
    console.error(chalk.red(e.message));
  }
}

run();
