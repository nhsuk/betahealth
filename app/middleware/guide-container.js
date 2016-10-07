module.exports = () => {
  return function guideContainer(req, res, next) {
    const pageData = req.pageData || {};

    if (pageData.layout === 'guide') {
      const first = pageData.pages[0];
      res.redirect(first);
    } else {
      next();
    }
  };
};
