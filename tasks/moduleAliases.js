'use strict';

const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

module.exports = {
    resolve: {
        alias: {
            app: path.join(projectRoot, 'app'),
            tables: path.join(projectRoot, 'tables'),
            generator: path.join(projectRoot, 'generator'),
            sentenceGenerator: path.join(projectRoot, 'sentenceGenerator')
        }
    }
};
