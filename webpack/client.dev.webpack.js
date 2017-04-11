const gutil = require('gulp-util');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve } = require('path');
const config = require('./config');

const { root, client } = config;
const { src, dist } = client;

const port = config.port || process.env.port || 9001;
const publicPath = `http://${config.hostname || 'localhost'}:${port}`;

module.exports = merge.smartStrategy({ entry: 'prepend' })(
   require('./client.webpack'), {
      entry: {
         app: [
            `webpack-dev-server/client?http://localhost:${port}/`,
            'webpack/hot/only-dev-server'
         ]
      },
      devServer: {
         port,
         publicPath,
         inline: true,
         lazy: false,
         hot: true,
         headers: { 'Access-Control-Allow-Origin': '*' },
         contentBase: resolve(root, dist),
         watchOptions: {
            aggregateTimeout: 300,
            poll: 100
         },
         historyApiFallback: {
            verbose: true,
            disableDotRule: false,
            logger: gutil.log.bind(gutil, `[${gutil.colors.magenta('dev-server]')}]`)
         },
         stats: {
            colors: true,
            context: resolve(root, src),
            cached: false,
            chunks: false,
            exclude: [/(node_modules)/],
            modules: false,
            children: false,
            hash: false,
            version: false
         },
      },
      plugins: [
         new webpack.HotModuleReplacementPlugin()
      ]
   }
);
