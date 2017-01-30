const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const nunjucks = require('nunjucks');
const markdown = require('nunjucks-markdown');
const md = require('markdown-it')({
  html: true,
  typographer: true,
});
const markdownItAbbr = require('markdown-it-abbr');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItContainer = require('markdown-it-container');
const markdownItNamedHeaders = require('markdown-it-named-headers');
const enforce = require('express-sslify');
const churchill = require('churchill');
const validator = require('express-validator');
const csrf = require('csurf');
const changeCase = require('change-case');
const slashify = require('slashify');
const logger = require('../lib/logger');
const customMdFilter = require('../lib/custom-md-filter');
const checkSecure = require('../app/middleware/check-secure');
const locals = require('../app/middleware/locals');
const assetPath = require('../app/middleware/asset-path');
const feedback = require('../app/middleware/feedback');
const csrfToken = require('../app/middleware/csrf-token');
const affinityCookie = require('../app/middleware/affinity-cookie');
const router = require('./routes');

md.use(markdownItAbbr);
md.use(markdownItAttrs);
md.use(markdownItDeflist);
md.use(markdownItNamedHeaders);

['info', 'info_compact', 'attention', 'warning', 'alert', 'severe'].forEach((filterName) => {
  md.use.call(md, markdownItContainer, filterName, customMdFilter('!', filterName));
});

['reveal', 'inline_reveal'].forEach((filterName) => {
  md.use.call(md, markdownItContainer, filterName, customMdFilter(':', filterName, true));
});

module.exports = (app, config) => {
  app.set('views', `${config.root}/app/views`);
  app.set('view engine', 'nunjucks');

  const nunjucksEnv = nunjucks.configure(`${config.root}/app/views`, {
    autoescape: true,
    express: app,
  });
  nunjucksEnv.addFilter('split', (str, seperator) => {
    return str.split(seperator);
  });
  nunjucksEnv.addFilter('kebabcase', (str) => {
    return changeCase.paramCase(str);
  });
  nunjucksEnv.addFilter('snakecase', (str) => {
    return changeCase.snakeCase(str);
  });
  nunjucksEnv.addFilter('renderString', (str) => {
    return nunjucksEnv.renderString(str);
  });
  nunjucksEnv.addGlobal('isCurrent', (str, search) => {
    const current = str || '';
    return current.indexOf(search) !== -1;
  });
  nunjucksEnv.addGlobal('loadComponent', function loadComponent(name) {
    return (name) ? this.ctx[name] : this.ctx;
  });
  nunjucksEnv.addGlobal('findersBaseUrl', config.findersBaseUrl);

  markdown.register(nunjucksEnv, (body) => {
    return md.render(body);
  });

  if (!config.ci) {
    app.use(churchill(logger));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(cookieParser());
  app.use(validator());
  app.use(checkSecure({
    trustProtoHeader: config.trustProtoHeader,
    trustAzureHeader: config.trustAzureHeader,
  }));
  app.use(locals(config));
  app.use(assetPath(config, nunjucksEnv));
  app.use(feedback());

  app.use(csrf({
    cookie: true,
  }));
  app.use(csrfToken());

  app.use(compress());
  app.use(methodOverride());

  app.use(favicon(path.join(__dirname, '..', 'assets', 'images', 'favicon.ico')));
  app.use(express.static(`${config.root}/public`));
  if (config.env !== 'production') {
    app.use(express.static(`${config.root}/.tmp`));
  }

  if (config.env !== 'development') {
    app.use(express.static(`${config.root}/build`));

    app.use(helmet.contentSecurityPolicy({
      loose: true,
      directives: {
        defaultSrc: [
          '\'self\'',
          config.staticCdn,
        ],
        frameSrc: [
          '\'self\'',
          '*.hotjar.com',
        ],
        scriptSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          'data:',
          'www.google-analytics.com',
          's.webtrends.com',
          'statse.webtrendslive.com',
          '*.hotjar.com',
          'cdn.jsdelivr.net',
          config.staticCdn,
        ],
        imgSrc: [
          '\'self\'',
          'data:',
          'www.google-analytics.com',
          'statse.webtrendslive.com',
          'hm.webtrends.com',
          config.staticCdn,
        ],
        styleSrc: [
          '\'self\'',
          '\'unsafe-inline\'',
          'fast.fonts.net',
          config.staticCdn,
        ],
        fontSrc: [
          'fast.fonts.net',
          config.fontCdn,
        ],
        connectSrc: [
          '\'self\'',
          'https://*.hotjar.com:*',
          'wss://*.hotjar.com',
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
      trustProtoHeader: config.trustProtoHeader,
      trustAzureHeader: config.trustAzureHeader,
    }));

    if (config.trustAzureHeader) {
      app.use(affinityCookie());
    }
  }

  // router
  app.use(slashify());
  app.use('/', router);

  app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const error = err;
    let template = 'error';
    let title = 'Something went wrong';

    if (error.code === 'EBADCSRFTOKEN') {
      title = 'Invalid form token';
    }

    if (error.message.indexOf('template not found') !== -1) {
      error.status = 404;
    }

    if (error.status !== 404) {
      logger.error(error);
    }

    if (error.status === 404) {
      template = 'page-not-found';
      title = 'Page not found';
    }

    res.status(error.status || 500);
    res.render(template, {
      title,
      message: error.message,
      error: config.env === 'development' ? error : {},
    });
  });
};
