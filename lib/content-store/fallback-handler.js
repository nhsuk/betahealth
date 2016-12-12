const detectSeries = require('async').detectSeries;

const logger = require('../logger');
const restHandler = require('./rest-handler');
const fileHandler = require('./file-handler');

const handlers = [
  restHandler,
  fileHandler,
];


const FallbackHandler = {
  name: 'Fallback - API then File System',
  get(pathname) {
    let record;

    return new Promise((resolve, reject) => {
      detectSeries(handlers, (handler, callback) => {
        handler.get(pathname)
          .then((result) => {
            record = result;
            logger.verbose(`Content handler: ${handler.name}`);
            callback(null, true);
          })
          .catch(() => {
            callback(null, false);
          });
      }, (err, result) => {
        if (!result) {
          return reject(new Error('Record could not be found'));
        }

        return resolve(record);
      });
    });
  },
  preview: restHandler.preview,
};

module.exports = FallbackHandler;
