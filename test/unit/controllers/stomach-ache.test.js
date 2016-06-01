const stomachAcheController = require(`${appFolder}/controllers/stomach-ache`);

describe('Stomach ache controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('stomach-ache');
          params.should.have.property('title');
          done();
        },
      };

      stomachAcheController.index({}, res);
    });
  });
});
