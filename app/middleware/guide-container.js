module.exports = (req, res, next) => {
  const pageData = req.pageData || {};
  const children = pageData.meta ? pageData.meta.children : [];

  if (pageData.guide && children && children.length > 0) {
    const first = children[0].slug;
    const guidePath = pageData.slug.replace(/\/$/, '');

    res.redirect(`/${guidePath}/${first}`);
  } else {
    next();
  }
};
