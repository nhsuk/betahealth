const config = require('../../config/config');

module.exports = (req, res, next) => {
  if (config.env !== 'development') {
    const err = new Error('Page not found');
    err.status = 404;
    return next(err);
  }

  return next();
};
