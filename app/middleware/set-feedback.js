module.exports = () => {
  return (req, res, next) => {
    const slug = req.originalUrl;
    const pageData = req.pageData || {};

    if (slug.indexOf('conditions') !== -1 || slug.indexOf('symptoms') !== -1) {
      pageData.feedback = true;
    } else {
      pageData.feedback = false;
    }

    // eslint-disable-next-line no-param-reassign
    req.pageData = pageData;
    next();
  };
};
