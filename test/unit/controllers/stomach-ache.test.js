const stomachAcheController = require(`${appFolder}/controllers/stomach-ache`);

describe('Stomach ache controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('stomach-ache');
          params.should.have.property('title');
          params.should.have.property('nonEmergencyCallout');

          params.should.have.property('feedback');
          params.feedback.should.equal(true);

          params.should.have.property('choicesOrigin');
          params.choicesOrigin.should.not.be.empty;
          done();
        },
      };

      stomachAcheController.index({}, res);
    });
  });
});
