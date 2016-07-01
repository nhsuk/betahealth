function index(req, res) {
  res.render('clinical-assurance', {
    title: 'How we make sure NHS.UK Beta content is medically sound',
  });
}

module.exports = {
  index,
};
