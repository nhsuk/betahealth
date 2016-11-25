const slug = 'path/to/page';
const config = {
  contentStore: {
    baseUrl: 'http://api-baseurl.com/',
    authToken: 'APIKEY123456789',
    timeout: 5000,
  },
};

describe('REST API Handler library', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.request = this.sandbox.stub();

    this.restHandler = proxyquire(`${rootFolder}/lib/content-store/rest-handler`, {
      request: this.request,
      '../../config/config': config,
    });
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#get', () => {
    describe('API base url is not set', () => {
      beforeEach(() => {
        this.restHandler = proxyquire(`${rootFolder}/lib/content-store/rest-handler`, {
          request: this.request,
          '../../config/config': {
            contentStore: {},
          },
        });
      });

      it('should reject the promise', () => {
        const get = this.restHandler.get(slug);

        this.request.should.not.have.been.called;
        return get.should.be.rejected;
      });
    });

    describe('API returns an error', () => {
      const error = new Error('API error');

      beforeEach(() => {
        this.request.yields(error);
      });

      it('should reject the promise', () => {
        return this.restHandler.get(slug).should.be.rejectedWith(error);
      });
    });

    describe('API returns a 404 status code', () => {
      beforeEach(() => {
        this.request.yields(null, { statusCode: 404 });
      });

      it('should resolve the promise with the record', () => {
        return this.restHandler.get(slug).should.be.rejected;
      });
    });

    describe('API returns a 200 status code', () => {
      describe('record contains no sidebar', () => {
        beforeEach(() => {
          this.request.yields(null, { statusCode: 200 }, {});
        });

        it('should resolve the promise with the record', () => {
          const get = this.restHandler.get(slug);

          this.request.should.have.been.calledWith({
            method: 'GET',
            json: true,
            timeout: config.contentStore.timeout,
            uri: `${config.contentStore.baseUrl}/pages/with-path/${slug}/`,
            headers: {
              Authorization: `Bearer ${config.contentStore.authToken}`,
            },
          });

          return get.should.become({
            layout: 'content-simple',
          });
        });
      });

      describe('record contains sidebar ordered first', () => {
        beforeEach(() => {
          this.request.yields(null, { statusCode: 200 }, {
            sidebarOrder: 'first',
            sidebar: [{}],
          });
        });

        it('should resolve the promise with the record', () => {
          return this.restHandler.get(slug).should.become({
            layout: 'content-sidebar-first',
            sidebarOrder: 'first',
            sidebar: [{}],
          });
        });
      });

      describe('record contains sidebar ordered last', () => {
        beforeEach(() => {
          this.request.yields(null, { statusCode: 200 }, {
            sidebarOrder: 'last',
            sidebar: [{}],
          });
        });

        it('should resolve the promise with the record', () => {
          return this.restHandler.get(slug).should.become({
            layout: 'content-sidebar-last',
            sidebarOrder: 'last',
            sidebar: [{}],
          });
        });
      });
    });
  });
});
