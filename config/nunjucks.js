const nunjucks = require('nunjucks');
const changeCase = require('change-case');

const markdown = require('./markdown');
const logger = require('../lib/logger');
const assetPath = require('../app/middleware/asset-path');

const COMPONENTS_PATH = '_components/';
const COMPONENT_EXT = 'nunjucks';

function ComponentExtension(env) {
  this.tags = ['component'];

  this.parse = function parse(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);

    parser.advanceAfterBlockEnd(tok.value);

    return new nodes.CallExtension(this, 'run', args);
  };

  this.run = function run(context, data, args) {
    const name = typeof args === 'undefined' ? data.name : data;
    const ctx = typeof args === 'undefined' ? data.context : args;

    let result = '';

    try {
      result = env.render(`${COMPONENTS_PATH}${changeCase.paramCase(name)}.${COMPONENT_EXT}`, ctx);
    } catch (e) {
      if (e.message.indexOf('template not found') > -1) {
        result = `Component '${name}' does not exist`;
      } else {
        result = e.message;
      }

      logger.error(result);
    }

    return new nunjucks.runtime.SafeString(result);
  };
}

module.exports = (app, config) => {
  const env = nunjucks.configure([
    `${config.root}/app/views`,
    `${config.root}/node_modules/nhsuk-frontend/src/templates`
  ], {
    autoescape: true,
    express: app,
  });

  // Register markdown support
  markdown(env);

  // Custom filters
  env.addFilter('split', (str, seperator) => {
    return str.split(seperator);
  });
  env.addFilter('kebabcase', (str) => {
    return changeCase.paramCase(str);
  });
  env.addFilter('snakecase', (str) => {
    return changeCase.snakeCase(str);
  });
  env.addFilter('sentencecase', (str) => {
    return changeCase.sentenceCase(str);
  });
  env.addFilter('assign', (obj, ...objects) => {
    return Object.assign({}, obj, ...objects);
  });
  env.addFilter('push', (array = [], item) => {
    array.push(item);
    return array;
  });
  env.addFilter('renderString', (str) => {
    return env.renderString(str);
  });

  // Add asset_path filter which requires the request object to check whether
  // page is secure
  if (app) {
    app.use(assetPath(config, env));
  }

  // Custom extensions
  env.addExtension('ComponentExtension', new ComponentExtension(env));

  // Global variables
  env.addGlobal('getContext', function getContext() {
    return this.ctx;
  });
  env.addGlobal('findersBaseUrl', config.findersBaseUrl);

  return env;
};
