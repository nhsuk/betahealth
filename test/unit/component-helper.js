const expect = require('chai').expect;
const path = require('path');
const changeCase = require('change-case');
const html = require('html');

const nunjucksConfig = require('../../config/nunjucks');

const nunjucks = nunjucksConfig(null, {
  root: path.normalize(`${__dirname}/../..`),
  findersBaseUrl: '',
});

nunjucks.addGlobal('asset_path', (filename) => {
  return filename;
});

const COMPONENTS_PATH = '_components/';
const COMPONENT_EXT = 'nunjucks';

const normaliseHtml = (string) => {
  return html.prettyPrint(string, {
    indent_size: 2,
  });
};

const renderComponent = (name, input) => {
  const componentPath = `${COMPONENTS_PATH}${changeCase.paramCase(name)}.${COMPONENT_EXT}`;
  return nunjucks.render(componentPath, input);
};

const expectComponent = (name, input, expected) => {
  // Normalise HTML whitespace, to make diffing simpler
  expect(
    normaliseHtml(renderComponent(name, input))
  ).to.equal(
    normaliseHtml(expected)
  );
};

module.exports.expectComponent = expectComponent;
