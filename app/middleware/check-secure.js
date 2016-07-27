/* eslint-disable no-param-reassign, no-restricted-syntax */
const defaults = {
  trustProtoHeader: false,
  trustAzureHeader: false,
};

/**
 * Apply options
 *
 * @param {Hash} options
 * @return {Hash}
 * @api private
 */
function applyOptions(options) {
  const settings = {};
  options = options || {};

  for (const option in defaults) {
    if ({}.hasOwnProperty.call(defaults, option)) {
      settings[option] = options[option] || defaults[option];
    }
  }
  return settings;
}

/**
 * enforceHTTPS
 *
 * @param {Hash} options
 * @param {Boolean} options[trustProtoHeader]
 * @param {Boolean} options[trustAzureHeader]
 * @api public
 */
const checkSecure = function checkSecure(options) {
  return function middleware(req, res, next) {
    options = applyOptions(options);

    // First, check if directly requested via https
    let isHttps = req.secure;

    // Second, if the request headers can be trusted (e.g. because they are send
    // by a proxy), check if x-forward-proto is set to https
    if (!isHttps && options.trustProtoHeader) {
      isHttps = ((req.headers['x-forwarded-proto'] || '').substring(0, 5) === 'https');
    }

    // Third, if trustAzureHeader is set, check for Azure's headers
    // indicating a SSL connection
    if (!isHttps && options.trustAzureHeader && req.headers['x-arr-ssl']) {
      isHttps = true;
    }

    // set secure status on request for use in other middlewars
    req.isHttps = isHttps;

    next();
  };
};

module.exports = checkSecure;
