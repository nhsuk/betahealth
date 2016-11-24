/*
  gulpfile.js
  ===========
  Rather than manage one giant configuration file responsible
  for creating multiple tasks, each task has been broken out into
  its own file in gulpfile.js/tasks. Any files in that directory get
  automatically required below.
  To add a new task, simply add a new task file that directory.
*/

const gulp = require('gulp');
const gulpRequireTasks = require('gulp-require-tasks');

const config = require('./config/config');

gulpRequireTasks({
  path: `${process.cwd()}/gulp/tasks/shared`,
});

if (config.env === 'development') {
  gulpRequireTasks({
    path: `${process.cwd()}/gulp/tasks/dev`,
  });
}

if (config.env === 'production') {
  gulpRequireTasks({
    path: `${process.cwd()}/gulp/tasks/prod`,
  });
}

gulp.task('default', ['build']);
