const path = require('path');
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');
const inPlace = require('metalsmith-in-place');
const assets = require('metalsmith-assets');
const nunjucks = require('nunjucks');
const nunDown = require('nunjucks-markdown');
const metalsmithMarkdown = require('metalsmith-markdownit')({
  html: true,
  typographer: true,
});
const markdownIt = require('markdown-it')({
  html: true,
  typographer: true,
});
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItContainer = require('markdown-it-container');
const customMdFilter = require('../lib/custom-md-filter');


const env = nunjucks.configure([
  './docs/layouts',
  './app/views'
], { watch: false });

env.addGlobal('asset_path', (filename) => {
  return `/${filename}`;
});

nunDown.register(env, markdownIt.render.bind(markdownIt));

metalsmithMarkdown.use(markdownItAbbr);
metalsmithMarkdown.use(markdownItAttrs);

['info', 'info_compact', 'attention', 'warning', 'alert', 'severe'].forEach((filterName) => {
  metalsmithMarkdown.use.call(metalsmithMarkdown, markdownItContainer, filterName, customMdFilter('!', filterName));
});

['reveal', 'inline_reveal'].forEach((filterName) => {
  metalsmithMarkdown.use.call(metalsmithMarkdown, markdownItContainer, filterName, customMdFilter(':', filterName, true));
});

metalsmithMarkdown.use.call(metalsmithMarkdown, markdownItContainer, 'example', customMdFilter('@', 'example', false, './docs/md-filters'));

const metalsmith = Metalsmith(__dirname)
  .source('src')
  .use(metalsmithMarkdown)
  .use(sass({
    outputDir: 'css/',
    includePaths: [
      path.join(__dirname, '../node_modules/')
    ],
  }))
  .use(layouts({
    engine: 'nunjucks',
    default: 'base.nunjucks',
    pattern: '**/*.{md,html}'
  }))
  .use(inPlace({
    engine: 'nunjucks'
  }))
  .use(assets({
    source: '../.tmp/assets', // relative to the working directory
    destination: './assets' // relative to the build directory
  }))
  .destination('build')
;

module.exports = metalsmith;
