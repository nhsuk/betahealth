function index(req, res) {
  res.render('stomach-ache', {
    title: 'Stomach ache',
    intro: 'Most stomach aches aren’t anything serious and will go away after a few days.',
    emergencyCallout: true,
    nonEmergencyCallout: true,
    gpCallout: true,
  });
}

module.exports = {
  index,
};
