const proxyquire = require('proxyquire');
const sinon = require('sinon');

const fsMock = {
  accessSync: {},
  readFileSync: {},
};
const loggerMock = {
  warn: {},
};

describe('git lookup library', () => {
  let gitLookup;

  beforeEach(() => {
    gitLookup = proxyquire(`${rootFolder}/lib/git-lookup`, {
      fs: fsMock,
      '../lib/logger': loggerMock,
    });
  });

  describe('#getGitSha', () => {
    describe('when a git sha doesn\'t exist', () => {
      before(() => {
        fsMock.accessSync = sinon.stub().throws();
        fsMock.readFileSync = sinon.stub();
        loggerMock.warn = sinon.stub();
      });

      it('it should throw an error and log it', () => {
        const sha = gitLookup.getGitSha();

        should.not.exist(sha);
        loggerMock.warn.should.have.been.called;
      });
    });

    describe('when a git sha exists it should return it', () => {
      before(() => {
        fsMock.accessSync = sinon.stub();
        fsMock.readFileSync = sinon.stub().returns('gitsha');
        loggerMock.warn = sinon.stub();
      });

      it('it should throw an error and log it', () => {
        const sha = gitLookup.getGitSha();

        sha.should.equal('gitsha');
        loggerMock.warn.should.not.have.been.called;
      });
    });
  });
});
