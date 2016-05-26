const express = require('express');
const helmet = require('helmet');
// const glob = require('glob');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');

const routes = require('./routes');

module.exports = (app, config) => {
  /* eslint-disable no-param-reassign */
  app.locals.GOOGLE_ANALYTICS_TRACKING_ID = config.googleAnalyticsId;
  /* eslint-enable no-param-reassign */

  app.set('views', `${config.root}/app/views`);
  app.set('view engine', 'nunjucks');
  nunjucks.configure(`${config.root}/app/views`, {
    autoescape: true,
    express: app,
  });

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(`${config.root}/build`));
  app.use(express.static(`${config.root}/public`));
  app.use(methodOverride());

  if (config.env !== 'development') {
    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\'', 'www.google-analytics.com', 'data:', '\'unsafe-inline\''],
      },
    }));
    app.use(helmet.xssFilter());
    app.use(helmet({
      frameguard: {
        action: 'deny',
      },
    }));
    app.use(helmet.hidePoweredBy());
    app.use(helmet.ieNoOpen());
    app.use(helmet.noSniff());
  }

  // routes middleware
  app.use(routes);

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: config.env === 'development' ? err : {},
      title: 'Error',
    });
  });
};
