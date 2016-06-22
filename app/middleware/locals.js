module.exports = (config) => {
  return function locals(req, res, next) {
    /* eslint-disable no-param-reassign */
    res.locals.GOOGLE_ANALYTICS_TRACKING_ID = config.googleAnalyticsId;
    res.locals.CDN_HOST = config.staticCdn;
    /* eslint-enable no-param-reassign */
    next();
  };
};
