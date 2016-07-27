const fungalNailInfectionController =
  require(`${appFolder}/controllers/fungal-nail-infection`);

describe('Fungal nail infection controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('fungal-nail-infection');
          params.should.have.property('title');

          params.should.have.property('feedback');
          params.feedback.should.equal(true);

          params.should.have.property('choicesOrigin');
          params.choicesOrigin.should.not.be.empty;
          done();
        },
      };

      fungalNailInfectionController.index({}, res);
    });
  });
});
