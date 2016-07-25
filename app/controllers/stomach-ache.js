function index(req, res) {
  res.render('stomach-ache', {
    title: 'Stomach ache',
    feedback: true,
    choicesOrigin: 'conditions/stomach-ache-abdominal-pain/Pages/Introduction.aspx',
    nonEmergencyCallout: true,
  });
}

module.exports = {
  index,
};
