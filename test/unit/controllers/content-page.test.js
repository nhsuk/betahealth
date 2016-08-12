describe('Content page controller', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.warn = this.sandbox.stub();
    this.next = this.sandbox.stub();

    this.contentPageController = proxyquire(`${appFolder}/controllers/content-page`, {
      '../../lib/logger': {
        warn: this.warn,
      },
    });
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#index', () => {
    describe('when a template file exists', () => {
      it('should render a template with params', (done) => {
        const bodyTest = '<html></html>';
        const templateTest = 'page-template';
        const res = {
          render: (template, params, callback) => {
            template.should.equal(templateTest);

            params.should.have.property('feedback');
            params.feedback.should.equal(true);

            callback(null, bodyTest);
          },
          send: (body) => {
            body.should.equal(bodyTest);
            this.warn.should.not.have.been.called;
            this.next.should.not.have.been.called;
            done();
          },
        };

        this.contentPageController.index({
          params: {
            page: templateTest,
          },
        }, res, this.next);
      });
    });

    describe('when a template file doesn\'t exist', () => {
      it('should render a template with params', (done) => {
        const res = {
          render: (template, params, callback) => {
            callback(new Error('Template not found'), null);

            this.warn.should.have.been.called;
            this.next.should.have.been.called;

            done();
          },
        };

        this.contentPageController.index({
          params: {
            page: '',
          },
        }, res, this.next);
      });
    });
  });
});
