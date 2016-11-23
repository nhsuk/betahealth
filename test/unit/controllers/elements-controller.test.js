// eslint-disable-next-line import/no-dynamic-require
const controller = require(`${appFolder}/controllers/elements-controller`);

describe('Elements controller', () => {
  describe('#index', () => {
    it('should render a template', (done) => {
      const res = {
        render: (template) => {
          template.should.equal('elements');
          done();
        },
      };

      controller.index({}, res);
    });
  });
});
