function index(req, res) {
  res.render('stomach-ache', {
    title: 'Stomach ache',
  });
}

module.exports = {
  index,
};
