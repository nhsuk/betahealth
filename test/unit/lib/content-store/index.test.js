const path = 'record-path';

const contentStore = require('../../../../lib/content-store');

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
    });

    afterEach(() => {
      this.sandbox.restore();
    });

    describe('REST handler', () => {
      beforeEach(() => {
        contentStore.handler = { get: this.restHandler };
      });

      it('should return the record from API', () => {
        this.restHandler.resolves(apiRecord);
        contentStore.getRecord(path).should.become(apiRecord);
        this.restHandler.should.be.called;
      });
    });

    describe('File system handler', () => {
      beforeEach(() => {
        contentStore.handler = { get: this.fileHandler };
      });

      it('should return the record from file', () => {
        this.fileHandler.resolves(fileRecord);
        contentStore.getRecord(path).should.become(fileRecord);
        this.fileHandler.should.be.called;
      });
    });
  });

  describe('#getPreview', () => {
    beforeEach(() => {
      this.sandbox = sinon.sandbox.create();
      this.restHandler = this.sandbox.stub().returnsPromise();
      this.fileHandler = this.sandbox.stub().returnsPromise();
    });

    afterEach(() => {
      this.sandbox.restore();
    });

    describe('REST handler', () => {
      beforeEach(() => {
        contentStore.handler = { preview: this.restHandler };
      });

      it('should return the record from API', () => {
        this.restHandler.resolves(apiRecord);
        contentStore.getPreview(path).should.become(apiRecord);
        this.restHandler.should.be.called;
      });
    });

    describe('File system handler', () => {
      beforeEach(() => {
        contentStore.handler = { preview: this.fileHandler };
      });

      it('should be called', () => {
        contentStore.getPreview(path);
        this.fileHandler.should.be.called;
      });
    });
  });
});
