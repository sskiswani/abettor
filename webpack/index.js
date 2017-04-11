module.exports = Object.assign(require('./config'), {
   webpack: {
      client: require('./client.webpack.js'),
      desktop: require('./client.webpack.js'),
      server: require('./client.webpack.js')
   }
});
