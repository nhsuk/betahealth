const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');
const enforce = require('express-sslify');

const locals = require('../app/middleware/locals');
const router = require('./routes');

module.exports = (app, config) => {
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
        defaultSrc: [
          '\'self\'',
        ],
        scriptSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          'data:',
          'www.google-analytics.com',
        ],
        fontSrc: [
          (config.staticCdn ? config.staticCdn.replace('//', '') : null),
        ],
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

    // eslint-disable-next-line new-cap
    app.use(enforce.HTTPS({
      trustProtoHeader: typeof config.dyno !== undefined,
      trustAzureHeader: typeof config.azureWebsiteName !== undefined,
    }));
  }

  // custom middlewares
  app.use(locals(config));

  // router
  app.use('/', router);

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
