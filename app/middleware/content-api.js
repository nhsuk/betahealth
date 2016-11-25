const contentApi = require('../../lib/content-api');
const parseurl = require('parseurl');

module.exports = (req, res, next) => {
  const parsedUrl = parseurl.original(req);
  const slug = parsedUrl.pathname.replace(/^\//, '') || 'index';

  contentApi.getRecord(`${slug}`)
    .then((record) => {
      let layout = slug;

      if (record) {
        layout = `_layouts/${record.layout}`;
      }

      /* eslint-disable no-param-reassign */
      record.slug = slug;
      req.layout = layout;
      req.pageData = record;
      /* eslint-enable no-param-reassign */
      next();
    })
    .catch(next);
};
