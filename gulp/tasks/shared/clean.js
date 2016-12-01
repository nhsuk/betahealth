const del = require('del');
const paths = require('../../paths');

// Cleans out any generated assets before rebuilding
module.exports = () => {
  return del([
    paths.build,
    paths.output,
  ]);
};
