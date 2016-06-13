const controller = require(`${appFolder}/controllers/cookies`);

describe('Cookies controller', () => {
  describe('#index', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('cookies');
          params.should.have.property('title');
          done();
        },
      };

      controller.index({}, res);
    });
  });
});
