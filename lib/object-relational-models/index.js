/**
 * Exports all object relational models
 */

const path = require('path');
const fs = require('fs');

const orms = {};
const ormsPath = __dirname;
const files = fs.readdirSync(ormsPath);

files.forEach((file) => {
    const baseName = path.basename(file, '.js');
    const isJsFile = path.extname(file) === '.js';
    const isThisFile = baseName === 'index';

    if(isJsFile && !isThisFile) {
        orms[baseName] = require(path.join(ormsPath, file));
    }
});

module.exports = orms;