const fs = require('fs');
const isString = require('lodash/isString');
const nunjucks = require('nunjucks');
const config = require('../config/config');

const VIEWS_PATH = `${config.root}/app/views/_md-filters`;

// Anything following filter name (which has to be without spaces) is treated as parameters:
// key/values separated by comma.
// e.g. ::: reveal title: Expand menu, type: inline
// When no key/value pairs are provided it defaults to value under key `title`
function paramsToObj(params) {
  const obj = {};
  let isTitle = true;

  if (params) {
    params.split(',').forEach((param) => {
      const keyVals = param.split(':');
      if (keyVals.length > 1) {
        isTitle = false;
        Object.assign(obj, {
          [keyVals[0].trim()]: keyVals[1].trim(),
        });
      }
    });
    if (isTitle) {
      obj.title = params;
    }
  }

  return obj;
}

function customMdFilter(marker, name, hasParams = false) {
  const contentPlaceholderPattern = /<!--\s*?content\s*?-->/;
  const filterNamePattern = new RegExp(`^${name}\\s+(.*)$`);
  const template = fs.readFileSync(`${VIEWS_PATH}/${name}.nunjucks`, 'utf-8');

  const filter = {
    marker,
    render: (tokens, idx) => {
      const node = tokens[idx];
      const isOpening = node.nesting === 1;
      const contentMatch = template.match(contentPlaceholderPattern);

      if (!contentMatch) {
        throw Error('Filter template requires <!--content--> placeholder to inject inner content');
      }

      const paramsMatch = node.info && node.info.trim().match(filterNamePattern);
      const templateHead = template.slice(0, contentMatch.index);
      const templateTail = template.slice(contentMatch.index + contentMatch[0].length);
      const params = Array.isArray(paramsMatch) ? paramsMatch[1] : '';
      const context = paramsToObj(params);

      if (isOpening) {
        return nunjucks.renderString(templateHead, context);
      }
      return nunjucks.renderString(templateTail, context);
    },
  };

  if (hasParams) {
    filter.validate = (params) => {
      if (!isString(params)) {
        throw Error('params must be provided if `hasParams` is enabled');
      }
      return params.trim().match(filterNamePattern);
    };
  }

  return filter;
}

module.exports = customMdFilter;
