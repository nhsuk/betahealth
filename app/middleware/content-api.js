const contentApi = require('../../lib/content-api');
const parseurl = require('parseurl');

module.exports = () => {
  return (req, res, next) => {
    const parsedUrl = parseurl.original(req);
    const slug = parsedUrl.pathname.replace(/^\//, '') || 'index';
    const record = contentApi.getRecord(`${slug}`);
    let layout = slug;

    if (record) {
      layout = `_layouts/${record.layout}`;
    }

    record.slug = slug;

    /* eslint-disable no-param-reassign */
    req.layout = layout;
    req.pageData = record;
    /* eslint-enable no-param-reassign */
    next();
  };
};
