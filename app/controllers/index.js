function index(req, res) {
  res.render('index', {
    title: 'Test pages for NHS.UK',
  });
}

module.exports = {
  index,
};
