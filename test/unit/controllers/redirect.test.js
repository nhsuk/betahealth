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
    describe('a route is called without a querystring', () => {
      it('redirect to the site root without a querystring', (done) => {
        const res = {
          redirect: (path) => {
            path.should.equal('/');
            done();
          },
        };

        redirectController.index({
          originalUrl: '/something',
        }, res);
      });
    });

    describe('a route is called with a querystring', () => {
      it('redirect to the site root including the querystring', (done) => {
        const res = {
          redirect: (path) => {
            path.should.equal('/?foo=bar');
            done();
          },
        };

        redirectController.index({
          originalUrl: '/something?foo=bar',
        }, res);
      });
    });
  });
});
