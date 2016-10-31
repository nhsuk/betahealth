// eslint-disable-next-line import/no-dynamic-require
const redirectController = require(`${appFolder}/controllers/redirect`);

describe('Redirect controller', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#index', () => {
    describe('a route is called', () => {
      it('redirect to the site root', (done) => {
        const res = {
          redirect: (path) => {
            path.should.equal('/');
            done();
          },
        };

        redirectController.index({}, res);
      });
    });
  });
});
