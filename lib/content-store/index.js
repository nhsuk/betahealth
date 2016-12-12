const config = require('../../config/config');
const logger = require('../logger');
const restHandler = require('./rest-handler');
const fallbackHandler = require('./fallback-handler');
const fileHandler = require('./file-handler');

const HANDLER_TYPE = config.contentStore.type;


function getHandler(type) {
  if (!type) {
    throw Error('Content handler type is missing. Check `contentStoreType` in config');
  }

  let handler;

  switch (type) {
    case 'rest':
      handler = restHandler;
      break;
    case 'fallback':
      handler = fallbackHandler;
      break;
    case 'file':
      handler = fileHandler;
      break;
    default:
      throw Error(`Could not find a handler matching ${type}`);
  }

  if (handler) {
    logger.verbose(`Content handler: ${handler.name}`);
  }

  return handler;
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
