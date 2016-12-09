describe('REST API Handler library', () => {
  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#get', () => {
    beforeEach(() => {
      this.sandbox = sinon.sandbox.create();
      this.verbose = this.sandbox.stub();
      this.restGet = this.sandbox.stub().returnsPromise();
      this.restPreview = this.sandbox.stub().returnsPromise();
      this.fileGet = this.sandbox.stub().returnsPromise();

      this.fallbackHandler = proxyquire(`${rootFolder}/lib/content-store/fallback-handler`, {
        './rest-handler': {
          get: this.restGet,
          preview: this.restPreview,
        },
        './file-handler': {
          get: this.fileGet,
        },
        '../logger': {
          verbose: this.verbose,
        },
      });
    });

    describe('REST handler resolves a record', () => {
      const record = {
        foo: 'bar',
      };

      beforeEach(() => {
        this.restGet.resolves(record);
      });

      it('return the REST record', () => {
        const fallbackGet = this.fallbackHandler.get('slug');

        this.restGet.should.have.been.called;
        this.fileGet.should.not.have.been.called;
        return fallbackGet.should.become(record);
      });
    });

    describe('REST handler rejects, File handler resolves', () => {
      const record = {
        foo: 'bar',
      };

      beforeEach(() => {
        this.restGet.rejects();
        this.fileGet.resolves(record);
      });

      it('return the file record', () => {
        const fallbackGet = this.fallbackHandler.get('slug');

        this.restGet.should.have.been.called;
        this.fileGet.should.have.been.called;
        return fallbackGet.should.become(record);
      });
    });

    describe('Both handlers reject', () => {
      beforeEach(() => {
        this.restGet.rejects();
        this.fileGet.rejects();
      });

      it('return an error', () => {
        const fallbackGet = this.fallbackHandler.get('slug');

        this.restGet.should.have.been.called;
        this.fileGet.should.have.been.called;
        return fallbackGet.should.be.rejectedWith('Record could not be found');
      });
    });
  });

  describe('#preview', () => {
    const record = {
      foo: 'bar',
    };

    beforeEach(() => {
      this.restPreview.resolves(record);
    });

    it('should call the rest preview method', () => {
      const fallbackPreview = this.fallbackHandler.preview('slug');

      this.restPreview.should.have.been.called;
      return fallbackPreview.should.become(record);
    });
  });
});
