const winston = require('winston');
const config = require('../config/config');
const loggingTransports = [];
const exceptionTransports = [];

loggingTransports.push(
  new (winston.transports.Console)({
    level: config.logLevel,
    json: false,
    colorize: true,
  })
);

if (config.env === 'production') {
  exceptionTransports.push(
    new (winston.transports.Console)({
      json: true,
      timestamp: true,
      colorize: false,
      stringify: function stringify(obj) {
        return JSON.stringify(obj);
      },
    })
  );
}

const logger = new (winston.Logger)({
  transports: loggingTransports,
  exceptionHandlers: exceptionTransports,
  exitOnError: true,
});
logger.cli();

module.exports = logger;
