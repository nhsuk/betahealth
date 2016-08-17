const contentPageController = require(`${appFolder}/controllers/content-page`);

describe('Content page controller', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.next = this.sandbox.stub();
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#index', () => {
    describe('when a template file exists', () => {
      it('should render a template with params', (done) => {
        const bodyTest = '<html></html>';
        const contentTypeTest = 'condition';
        const templateTest = 'headache';
        const res = {
          render: (template, params, callback) => {
            template.should.equal(`${contentTypeTest}/${templateTest}`);

            params.should.have.property('feedback');
            params.feedback.should.equal(true);

            callback(null, bodyTest);
          },
          send: (body) => {
            body.should.equal(bodyTest);
            this.next.should.not.have.been.called;
            done();
          },
        };

        contentPageController.index({
          params: {
            type: contentTypeTest,
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

            this.next.should.have.been.calledWith(new Error());

            done();
          },
        };

        contentPageController.index({
          params: {},
        }, res, this.next);
      });
    });
  });
});
