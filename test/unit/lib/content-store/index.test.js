const path = 'record-path';
const apiRecord = {
  from: 'API',
};
const fileRecord = {
  from: 'file',
};

describe('Content Store library', () => {
  describe('#getRecord', () => {
    beforeEach(() => {
      this.sandbox = sinon.sandbox.create();
      this.restHandler = this.sandbox.stub().returnsPromise();
      this.fileHandler = this.sandbox.stub().returnsPromise();

      this.contentStore = proxyquire(`${rootFolder}/lib/content-store`, {
        './rest-handler': {
          get: this.restHandler,
        },
        './file-handler': {
          get: this.fileHandler,
        },
      });
    });

    afterEach(() => {
      this.sandbox.restore();
    });

    describe('API resolves the promise', () => {
      it('should return the record from API', () => {
        this.restHandler.resolves(apiRecord);
        return this.contentStore.getRecord(path).should.become(apiRecord);
      });
    });

    describe('API rejects the promise', () => {
      describe('File system resolves the promise', () => {
        it('should return the record from file', () => {
          this.restHandler.rejects('API failed to respond');
          this.fileHandler.resolves(fileRecord);
          return this.contentStore.getRecord(path).should.become(fileRecord);
        });
      });

      describe('File system rejects the promise', () => {
        it('should reject the promise', () => {
          this.restHandler.rejects('No record in API');
          this.fileHandler.rejects('No record on file');
          return this.contentStore.getRecord(path).should.be.rejected;
        });
      });
    });
  });
});
