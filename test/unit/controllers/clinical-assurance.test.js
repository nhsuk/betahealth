const controller = require(`${appFolder}/controllers/clinical-assurance`);

describe('Clinical assurance controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('clinical-assurance');
          params.should.have.property('title');
          done();
        },
      };

      controller.index({}, res);
    });
  });
});
