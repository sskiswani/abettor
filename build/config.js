const { Directory } = require('./utils');

const rootDir = Directory.resolve(__dirname, '..');
const srcDir = rootDir.cd('./src');
const outDir = rootDir.cd('./dist');

module.exports = {
   pkg: require('../package.json'),
   rootDir,
   srcDir,
   outDir,

   absPath: rootDir.abs,
   relPath: rootDir.rel,

   paths: {
      app: {
         srcDir: srcDir.abs('app'),
         entry: srcDir.abs('app/index.ts'),
         out: outDir.abs('app')
      },

      server: {
         entry: srcDir.abs('./src/index.ts'),
         out: srcDir.abs('./dist')
      }
   }
};
