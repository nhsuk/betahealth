const contentRouter = require('./content-router');
const previewRouter = require('./preview-router');
const developmentRouter = require('./development-router');
const appStatusRouter = require('./app-status-router');
const imageProxyRouter = require('./image-proxy-router');

module.exports = [
  appStatusRouter,
  contentRouter,
  imageProxyRouter,
  previewRouter,
  developmentRouter,
];
