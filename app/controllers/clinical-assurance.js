function index(req, res) {
  res.render('clinical-assurance', {
    title: 'How we make sure NHS.UK Alpha content is medically sound',
  });
}

module.exports = {
  index,
};
