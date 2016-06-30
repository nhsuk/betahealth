module.exports = () => {
  return function csrfToken(req, res, next) {
    /* eslint-disable no-param-reassign */
    res.locals.csrfToken = req.csrfToken();
    /* eslint-enable no-param-reassign */
    next();
  };
};
