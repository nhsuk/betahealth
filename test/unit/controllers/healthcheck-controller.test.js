describe('Healthcheck controller', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.getGitSha = this.sandbox.stub();
    this.version = undefined;
  });

  afterEach(() => {
    this.sandbox.restore();
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
      const controller = proxyquire(`${appFolder}/controllers/healthcheck-controller`, {
        '../../package.json': {
          version: this.version,
        },
        '../../lib/git-lookup': {
          getGitSha: this.getGitSha,
        },
      });

      controller.index({}, res);
    });

    it('should return the correct package version', (done) => {
      const pkgVersion = '1';
      const res = {
        json: (params) => {
          params.version.should.equal(pkgVersion);
          done();
        },
      };
      const controller = proxyquire(`${appFolder}/controllers/healthcheck-controller`, {
        '../../package.json': {
          version: pkgVersion,
        },
        '../../lib/git-lookup': {
          getGitSha: this.getGitSha,
        },
      });

      controller.index({}, res);
    });

    it('should return the correct git sha', (done) => {
      const sha = 'gitsha';
      const res = {
        json: (params) => {
          params.sha.should.equal(sha);
          done();
        },
      };
      const controller = proxyquire(`${appFolder}/controllers/healthcheck-controller`, {
        '../../lib/git-lookup': {
          getGitSha: this.getGitSha.returns(sha),
        },
      });

      controller.index({}, res);
    });
  });
});
