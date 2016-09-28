describe('Content page controller', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.next = this.sandbox.stub();
    this.getRecord = this.sandbox.stub();

    this.contentPageController = proxyquire(`${appFolder}/controllers/content-page`, {
      '../../lib/content-api': {
        getRecord: this.getRecord,
      },
    });
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#index', () => {
    describe('when a content API record exists', () => {
      it('should render a template with params', (done) => {
        const record = {
          layout: 'content-simple',
          title: 'Content page title',
        };
        const res = {
          render: (template, params) => {
            template.should.equal(`_layouts/${record.layout}`);

            params.should.have.property('feedback');
            params.feedback.should.equal(false);

            params.should.have.property('title');
            params.title.should.equal(record.title);

            done();
          },
        };

        this.getRecord.returns(record);
        this.contentPageController.index({
          originalUrl: '',
        }, res, this.next);
      });
    });

    describe('when a content API record doesn\'t exist', () => {
      describe('and a template file exists', () => {
        it('should render a template with params', (done) => {
          const bodyTest = '<html></html>';
          const slugTest = 'sample/url/slug';
          const res = {
            render: (template, params, callback) => {
              template.should.equal(`${slugTest}`);

              params.should.have.property('feedback');
              params.feedback.should.equal(false);

              callback(null, bodyTest);
            },
            send: (body) => {
              body.should.equal(bodyTest);
              this.next.should.not.have.been.called;
              done();
            },
          };

          this.contentPageController.index({
            originalUrl: slugTest,
          }, res, this.next);
        });
      });

      describe('and a template file doesn\'t exist', () => {
        it('should should call the next callback with an error', (done) => {
          const res = {
            render: (template, params, callback) => {
              callback(new Error('Template not found'), null);

              this.next.should.have.been.calledWith(new Error());

              done();
            },
          };

          this.contentPageController.index({
            originalUrl: '',
          }, res, this.next);
        });
      });
    });

    describe('when the slug contains a condition path', () => {
      it('should set feedback to true', (done) => {
        const slugTest = 'conditions/url/slug';
        const res = {
          render: (template, params) => {
            template.should.equal(`${slugTest}`);

            params.should.have.property('feedback');
            params.feedback.should.equal(true);

            done();
          },
        };

        this.contentPageController.index({
          originalUrl: slugTest,
        }, res);
      });
    });

    describe('when the slug contains is a symptom path', () => {
      it('should set feedback to true', (done) => {
        const slugTest = 'symptoms/url/slug';
        const res = {
          render: (template, params) => {
            template.should.equal(`${slugTest}`);

            params.should.have.property('feedback');
            params.feedback.should.equal(true);

            done();
          },
        };

        this.contentPageController.index({
          originalUrl: slugTest,
        }, res);
      });
    });
  });
});
