const indexController = require(`${appFolder}/controllers/index`);

describe('Index controller', () => {
  describe('index action', () => {
    it('should render a template with params', (done) => {
      const res = {
        render: (template, params) => {
          template.should.equal('index');
          params.should.have.property('title');
          done();
        },
      };

      indexController.index({}, res);
    });
  });
});
