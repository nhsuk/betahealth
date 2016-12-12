const contentStore = require('../../lib/content-store');
const parseurl = require('parseurl');

module.exports = (req, res, next) => {
  const request = req || {};
  const parsedUrl = parseurl.original(request);
  const slug = parsedUrl.pathname.replace(/^\//, '') || 'index';

  contentStore.getRecord(slug)
    .then((response) => {
      const record = response;

      let layout = slug;
      if (record) {
        layout = `_layouts/${record.layout}`;
      }

      record.slug = slug;
      request.layout = layout;
      request.pageData = record;

      // eslint-disable-next-line no-param-reassign
      req = request;
      return next();
    })
    .catch((err) => {
      // eslint-disable-next-line no-param-reassign
      err.status = 404;
      return next(err);
    });
};
