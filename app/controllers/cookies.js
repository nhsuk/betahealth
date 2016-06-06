function index(req, res) {
  res.render('cookies', {
    title: 'Cookies',
  });
}

module.exports = {
  index,
};
