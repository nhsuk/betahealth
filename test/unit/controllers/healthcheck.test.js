const proxyquire = require('proxyquire');
const sinon = require('sinon');

const packageMock = {
  version: undefined,
};
const gitLookupMock = {
  getGitSha: sinon.stub(),
};

describe('Healthcheck controller', () => {
  let controller;

  beforeEach(() => {
    controller = proxyquire(`${appFolder}/controllers/healthcheck`, {
      '../../package.json': packageMock,
      '../../lib/git-lookup': gitLookupMock,
    });
  });

  describe('#index', () => {
    it('should return a json response', (done) => {
      const res = {
        json: (params) => {
          params.should.have.property('version');
          params.should.have.property('sha');

          should.not.exist(params.version);
          should.not.exist(params.sha);
          done();
        },
      };

      controller.index({}, res);
    });
  });

  describe('#index', () => {
    const version = 1;

    before(() => {
      packageMock.version = version;
    });

    it('should return a version if set', (done) => {
      const res = {
        json: (params) => {
          params.version.should.equal(version);
          done();
        },
      };

      controller.index({}, res);
    });
  });

  describe('#index', () => {
    const sha = 'gitsha';

    before(() => {
      gitLookupMock.getGitSha = sinon.stub().returns(sha);
    });

    it('should return a git sha if one is set', (done) => {
      const res = {
        json: (params) => {
          params.sha.should.equal(sha);
          gitLookupMock.getGitSha().should.equal(sha);
          gitLookupMock.getGitSha.should.have.been.called;
          done();
        },
      };

      controller.index({}, res);
    });
  });
});
