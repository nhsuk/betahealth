const config = require('../config/config');
const winston = require('winston');
const appInsights = require('applicationinsights');
const winstonAppInsights = require('winston-azure-application-insights');

const loggingTransports = [];
const insights = appInsights
  .setup(config.appInsightsKey).start()
  .getClient(config.appInsightsKey);


loggingTransports.push(new (winston.transports.Console)({
  level: config.logLevel,
  json: false,
  colorize: true,
  handleExceptions: true,
}));

if (config.env === 'production') {
  loggingTransports.push(new (winstonAppInsights.AzureApplicationInsightsLogger)({
    level: config.logLevel,
    client: insights,
    treatErrorsAsExceptions: true,
    handleExceptions: true,
  }));
}

const logger = new (winston.Logger)({
  transports: loggingTransports,
  exitOnError: true,
});
logger.cli();
logger.insights = insights;

module.exports = logger;
