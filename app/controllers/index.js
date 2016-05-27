function index(req, res) {
  res.render('index', {
    title: 'NHS.UK Beta',
  });
}

module.exports = {
  index,
};
