module.exports = (config) => {
  return function locals(req, res, next) {
    const isHttps = (req.headers['x-forwarded-proto'] === 'https');
    let assetPath = '/';

    if (config.env === 'production') {
      assetPath = `${(isHttps ? 'https' : req.protocol)}://${req.get('host')}/`;
    }

    /* eslint-disable no-param-reassign */
    res.locals.GOOGLE_ANALYTICS_TRACKING_ID = config.googleAnalyticsId;
    res.locals.ASSET_PATH = assetPath;
    res.locals.CDN_HOST = config.staticCdn;
    /* eslint-enable no-param-reassign */
    next();
  };
};
