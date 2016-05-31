const elementsController = require(`${appFolder}/controllers/elements`);

describe('Elements controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('elements');
          params.should.have.property('title');
          done();
        },
      };

      elementsController.index({}, res);
    });
  });
});
