const findIndex = require('lodash/findIndex');

module.exports = () => {
  return function guide(req, res, next) {
    const pageData = req.pageData || {};

    if (pageData && pageData.guide) {
      const currentIndex = findIndex(pageData.guide.pages, (p) => {
        return pageData.slug.indexOf(p.slug) !== -1;
      });

      if (currentIndex > 0) {
        pageData.guide.previous = pageData.guide.pages[currentIndex - 1];
      }

      if (currentIndex < pageData.guide.pages.length) {
        pageData.guide.next = pageData.guide.pages[currentIndex + 1];
      }

      pageData.guide.currentIndex = currentIndex;
      pageData.guide.current = pageData.guide.pages[currentIndex];
    }

    // eslint-disable-next-line no-param-reassign
    req.pageData = pageData;
    next();
  };
};
