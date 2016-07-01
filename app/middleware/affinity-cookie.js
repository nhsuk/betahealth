module.exports = () => {
  return function affinityCookie(req, res, next) {
    res.header('Arr-Disable-Session-Affinity', 'True');
    next();
  };
};
