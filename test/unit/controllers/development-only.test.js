const config = {
  env: '',
};

describe('Elements controller', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.next = this.sandbox.stub();

    this.controller = proxyquire(`${appFolder}/controllers/development-only`, {
      '../../config/config': config,
    });
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#index', () => {
    describe('when in development mode', () => {
      before(() => {
        config.env = 'development';
      });

      after(() => {
        config.env = '';
      });

      it('should render a template', (done) => {
        const slug = 'elements';
        const res = {
          render: (template) => {
            template.should.equal(slug);
            done();
          },
        };

        this.controller.index({
          params: {
            slug,
          },
        }, res);
      });
    });

    describe('when not in development mode', () => {
      before(() => {
        config.env = 'production';
      });

      after(() => {
        config.env = '';
      });

      it('should not render a template', () => {
        const err = new Error();
        err.status = 404;

        this.controller.index({}, {}, this.next);
        this.next.should.have.been.calledWith(err);
      });
    });
  });
});
