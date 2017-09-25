#!/usr/bin/env bash

set -e

./node_modules/.bin/rollup -c
./scripts/build-css.js
./scripts/build-html.js
./scripts/build-icons.js
./scripts/build-manifest.js
./scripts/build-zip.js

echo "Build done. copy-selector.zip is ready to be uploaded!"
