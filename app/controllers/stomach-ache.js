function index(req, res) {
  res.render('stomach-ache', {
    title: 'Stomach ache',
    intro: 'Most stomach aches aren’t anything serious and will go away after a few days.',
    feedback: true,
    choicesOrigin: 'conditions/stomach-ache-abdominal-pain/Pages/Introduction.aspx',
    emergencyCallout: true,
    nonEmergencyCallout: true,
    gpCallout: true,
  });
}

module.exports = {
  index,
};
