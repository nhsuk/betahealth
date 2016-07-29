function index(req, res) {
  res.render('fungal-nail-infection', {
    title: 'Fungal nail infection',
    feedback: true,
    choicesOrigin: 'conditions/fungal-nail-infection/pages/introduction.aspx',
  });
}

module.exports = {
  index,
};
