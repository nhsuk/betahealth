const config = require('../../config/config');
const logger = require('../logger');
const restHandler = require('./rest-handler');
const fileHandler = require('./file-handler');

const HANDLER_TYPE = config.contentStore.type;


function getHandler(type) {
  logger.verbose(`Content handler: ${type}`);

  if (!type) {
    throw Error('Content handler type is missing. Check `contentStoreType` in config');
  }

  switch (type) {
    case 'rest':
      return restHandler;
    case 'file':
    default:
      return fileHandler;
  }
}

const ContentStore = {
  handler: getHandler(HANDLER_TYPE),

  getRecord(pathName) {
    return this.handler.get(pathName);
  },

  getPreview(pathName) {
    return this.handler.preview(pathName);
  },
};

module.exports = ContentStore;
