const { resolve } = require('path');
const { config } = require('../package.json');

const root = resolve(__dirname, '..');
const { src, dist } = config;
const makeConfig = (moduleName) => ({
   src: resolve(root, src, moduleName),
   dist: resolve(root, dist, moduleName)
});

module.exports = Object.assign(config, {
   root,

   client: makeConfig('client'),
   server: makeConfig('server'),
   desktop: makeConfig('desktop'),

   babelOptions: {
      cacheDirectory: true,
      'presets': [
         [
            'es2015',
            {
               'modules': false
            }
         ],
         'es2016',
         'stage-0'
      ]
   },

});
