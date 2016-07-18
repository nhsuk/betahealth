function index(req, res) {
  res.render('rashes-in-babies-and-children', {
    title: 'Rashes in babies and children',
    feedback: true,
    choicesOrigin: 'conditions/skin-rash-children/Pages/Introduction.aspx',
    nonEmergencyCallout: true,
  });
}

module.exports = {
  index,
};
