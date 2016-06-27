describe('git lookup library', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.warn = this.sandbox.stub();
    this.accessSync = this.sandbox.stub();
    this.readFileSync = this.sandbox.stub();

    this.gitLookup = proxyquire(`${rootFolder}/lib/git-lookup`, {
      fs: {
        accessSync: this.accessSync,
        readFileSync: this.readFileSync,
      },
      '../lib/logger': {
        warn: this.warn,
      },
    });
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#getGitSha', () => {
    describe('when a git sha doesn\'t exist', () => {
      it('it should throw an error and log it', () => {
        this.accessSync = this.sandbox.stub().throws();

        should.not.exist(this.gitLookup.getGitSha());
        this.warn.should.have.been.called;
      });
    });

    describe('when a git sha exists', () => {
      it('it should return the sha', () => {
        this.readFileSync.returns('gitsha');

        this.gitLookup.getGitSha().should.equal('gitsha');
        this.readFileSync.should.have.been.calledWith('./.source_version');
        this.warn.should.not.have.been.called;
      });
    });
  });
});
