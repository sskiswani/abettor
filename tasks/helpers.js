const gutil = require('gulp-util');
const colors = gutil.colors;

const formatTask = (taskName) => colors.bold.magenta(`[${taskName}]`);
const logTask = (task, msg, ...opts) => gutil.log(`${formatTask(task)}: ${msg}`, ...opts);

const makeTaskLogger = (taskName) => {
   const prefix = formatTask(taskName);
   return (msg, ...opts) => gutil.log(taskName, msg, ...opts);
};

module.exports = {
   formatTask,
   logTask,
   makeTaskLogger
};
