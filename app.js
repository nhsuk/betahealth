const express = require('express');
const config = require('./config/config');
const logger = require('./lib/logger');

const app = express();

require('./config/express')(app, config);

app.listen(config.port, () => {
  logger.info('App listening on port', config.port);
});
