/* eslint-disable no-param-reassign, global-require */
const logger = require('../../lib/logger');

const manifestPath = '../../build/rev-manifest.json';
let manifestFile = {};

try {
  manifestFile = require(manifestPath);
} catch (e) {
  logger.warn(`No asset manifest file found. This is only a concern if running
    in production after revisioning assets.`);
}

module.exports = (config) => {
  return function locals(req, res, next) {
    res.locals.asset_path = (filename) => {
      let assetRoot = '/';

      if (config.env === 'production') {
        assetRoot = `${(req.isHttps ? 'https' : req.protocol)}://${req.get('host')}/`;
      }

      if (manifestFile[filename]) {
        filename = manifestFile[filename];
      }

      return `${assetRoot}${filename}`;
    };
    next();
  };
};
