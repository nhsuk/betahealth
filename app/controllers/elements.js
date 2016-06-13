function index(req, res) {
  res.render('elements', {
    title: 'HTML Elements',
  });
}

module.exports = {
  index,
};
