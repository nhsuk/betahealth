const rashesInChildrenController =
  require(`${appFolder}/controllers/rashes-in-babies-and-children`);

describe('Rashes in babies and children controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('rashes-in-babies-and-children');
          params.should.have.property('title');
          params.should.have.property('nonEmergencyCallout');

          params.should.have.property('feedback');
          params.feedback.should.equal(true);

          params.should.have.property('choicesOrigin');
          params.choicesOrigin.should.not.be.empty;
          done();
        },
      };

      rashesInChildrenController.index({}, res);
    });
  });
});
