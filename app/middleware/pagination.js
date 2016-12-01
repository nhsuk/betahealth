const findIndex = require('lodash/findIndex');

module.exports = (req, res, next) => {
  const pageData = req.pageData || {};
  const siblings = pageData.meta ? pageData.meta.siblings : [];
  const pagination = pageData.pagination || {};

  if (pageData && pageData.guide && siblings) {
    const currentIndex = findIndex(siblings, (p) => {
      return pageData.slug.indexOf(p.slug) !== -1;
    });

    if (currentIndex > 0) {
      pagination.previous = siblings[currentIndex - 1];
    }

    if (siblings && currentIndex < siblings.length) {
      pagination.next = siblings[currentIndex + 1];
    }

    pageData.pagination = pagination;
  }

  // eslint-disable-next-line no-param-reassign
  req.pageData = pageData;
  next();
};
