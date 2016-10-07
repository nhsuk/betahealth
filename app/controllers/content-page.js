function index(req, res, next) {
  res.render(req.layout, req.pageData, (err, html) => {
    if (err) {
      next(err);
    } else {
      res.send(html);
    }
  });
}

module.exports = {
  index,
};
