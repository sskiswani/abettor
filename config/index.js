const { resolve } = require('path');
const { config } = require('../package.json');

module.exports = Object.assign(config, {
   root: resolve(__dirname, '..')
});
