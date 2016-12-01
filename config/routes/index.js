const contentRouter = require('./content-router');
const developmentRouter = require('./development-router');
const appStatusRouter = require('./app-status-router');

module.exports = [
  appStatusRouter,
  contentRouter,
  developmentRouter,
];
