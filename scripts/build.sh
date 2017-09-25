#!/usr/bin/env bash

set -e

./node_modules/.bin/rollup -c
./scripts/build-css.js
./scripts/build-html.js
./scripts/build-icons.js
./scripts/build-manifest.js

echo "Build done. Now put your key.pem file inside copy-selector/, zip it, and upload it!"
