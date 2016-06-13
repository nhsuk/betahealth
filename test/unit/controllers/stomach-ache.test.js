const stomachAcheController = require(`${appFolder}/controllers/stomach-ache`);

describe('Stomach ache controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('stomach-ache');
          params.should.have.property('title');
          params.should.have.property('emergencyCallout');
          params.should.have.property('nonEmergencyCallout');
          params.should.have.property('gpCallout');
          done();
        },
      };

      stomachAcheController.index({}, res);
    });
  });
});
