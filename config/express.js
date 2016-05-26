const express = require('express');
const helmet = require('helmet');
const glob = require('glob');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  /* eslint-disable no-param-reassign */
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env === 'development';
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

  if (env !== 'development') {
    app.use(helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [],
        styleSrc: [],
        imgSrc: [],
        fontSrc: [],
        objectSrc: [],
        connectSrc: [],
        mediaSrc: [],
        frameSrc: [],
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

  const controllers = glob.sync(`${config.root}/app/controllers/*.js`);
  controllers.forEach((controller) => {
    // eslint-disable-next-line global-require
    require(controller)(app);
  });

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
      error: env === 'development' ? err : {},
      title: 'Error',
    });
  });
};
