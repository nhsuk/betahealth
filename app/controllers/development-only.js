const config = require('../../config/config');

function index(req, res, next) {
  if (config.env !== 'development') {
    const err = new Error('Page not found');
    err.status = 404;
    return next(err);
  }

  return res.render(`${req.params.slug}`);
}

module.exports = {
  index,
};
