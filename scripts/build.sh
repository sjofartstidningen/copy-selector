#!/usr/bin/env bash

set -e

./node_modules/.bin/rollup -c
./node_modules/.bin/node-sass src/content.scss copy-selector/content.css
./scripts/build-html.js
./scripts/build-icons.js
./scripts/build-manifest.js

echo "Build done. Now put your key.pem file inside copy-selector/, zip it, and upload it!"
