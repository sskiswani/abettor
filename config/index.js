module.exports = Object.assign(require('../config'), {
   webpackConfig: {
      base: require('./webpack/webpack.base'),
      client: require('./webpack/webpack.base'),
      server: require('./webpack/webpack.base')
   }
});
