const markdownItAbbr = require('markdown-it-abbr');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItDeflist = require('markdown-it-deflist');
const markdownItNamedHeaders = require('markdown-it-named-headers');
const njkMarkdown = require('nunjucks-markdown');
const md = require('markdown-it')({
  html: true,
  typographer: true,
});

md.use(markdownItAbbr);
md.use(markdownItAttrs);
md.use(markdownItDeflist);
md.use(markdownItNamedHeaders);

module.exports = (nunjucks) => {
  if (nunjucks) {
    njkMarkdown.register(nunjucks, (body) => {
      return md.render(body);
    });
  }
};
