const path = require('path');

function Directory(cwd) {
   this.cwd = cwd || __dirname;
   this.rel = to => path.relative(this.cwd, to);
   this.path = (this.abs = (...paths) => path.resolve(this.cwd, ...paths));
   this.cd = (...paths) => new Directory(path.resolve(this.cwd, ...paths));
   this.toString = () => this.cwd;
}

Directory.from = (dir = __dirname) => new Directory(dir);
Directory.resolve = (...paths) => new Directory(path.resolve(...paths));

module.exports = {
   Directory
};
