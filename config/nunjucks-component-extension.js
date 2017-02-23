const nunjucks = require('nunjucks');
const changeCase = require('change-case');
const logger = require('../lib/logger');

const COMPONENTS_PATH = '_components/';
const COMPONENT_EXT = 'nunjucks';

function ComponentExtension() {
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
      result = nunjucks.render(`${COMPONENTS_PATH}${changeCase.paramCase(name)}.${COMPONENT_EXT}`, ctx);
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

module.exports = new ComponentExtension();
