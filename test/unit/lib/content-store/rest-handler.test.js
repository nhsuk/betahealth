const rewire = require('rewire');

const slug = 'path/to/page';
const config = {
  contentStore: {
    apiBaseUrl: 'http://api-baseurl.com/api',
    authToken: 'APIKEY123456789',
    timeout: 5000,
    imageBaseUrl: 'http://api-baseurl.com/images',
    imageSignatureKey: 'signaturekey',
    imageProxyPath: '/image-path',
  },
};

describe('REST API Handler library', () => {
  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#get', () => {
    beforeEach(() => {
      this.sandbox = sinon.sandbox.create();
      this.request = this.sandbox.stub();
      this.createHmac = this.sandbox.stub().returnsThis();
      this.update = this.sandbox.stub().returnsThis();
      this.digest = this.sandbox.stub();
      this.config = Object.assign({}, config);

      this.restHandler = proxyquire(`${rootFolder}/lib/content-store/rest-handler`, {
        crypto: {
          createHmac: this.createHmac,
          update: this.update,
          digest: this.digest,
        },
        request: this.request,
        '../../config/config': this.config,
      });
    });

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
            uri: `${config.contentStore.apiBaseUrl}/pages/with-path/${slug}/`,
            headers: {
              Authorization: `Bearer ${config.contentStore.authToken}`,
            },
          });

          return get.should.become({});
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
            sidebarOrder: 'last',
            sidebar: [{}],
          });
        });
      });

      describe('record contains an image', () => {
        beforeEach(() => {
          this.request.yields(null, { statusCode: 200 }, {
            meta: {
              type: 'page',
            },
            main: [
              {
                type: 'image',
                value: {
                  id: 2,
                  meta: {
                    type: 'images.Image',
                  },
                  slug: 'image-slug.jpeg',
                  version: 1,
                },
              },
              {
                type: 'figureList',
                value: [{
                  id: 2,
                  meta: {
                    type: 'images.Image',
                  },
                  slug: 'image-slug.jpeg',
                  version: 1,
                }],
              },
            ],
          });
          this.digest.returns('signature');
        });

        it('should transform image data', () => {
          const getRecord = this.restHandler.get(slug);

          this.createHmac.should.have.been.called;
          this.update.should.have.been.called;

          return getRecord.should.become({
            meta: {
              type: 'page',
            },
            main: [
              {
                type: 'image',
                value: {
                  id: 2,
                  meta: {
                    type: 'images.Image',
                  },
                  slug: 'image-slug.jpeg',
                  srcset: [
                    '/image-path/signature/2/width-400/1/image-slug.jpeg 400w',
                    '/image-path/signature/2/width-640/1/image-slug.jpeg 640w',
                    '/image-path/signature/2/width-800/1/image-slug.jpeg 800w',
                    '/image-path/signature/2/width-1280/1/image-slug.jpeg 1280w',
                  ],
                  version: 1,
                },
              },
              {
                type: 'figureList',
                value: [{
                  id: 2,
                  meta: {
                    type: 'images.Image',
                  },
                  slug: 'image-slug.jpeg',
                  srcset: [
                    '/image-path/signature/2/width-300/1/image-slug.jpeg 300w',
                    '/image-path/signature/2/width-600/1/image-slug.jpeg 600w',
                  ],
                  version: 1,
                }],
              },
            ],
          });
        });

        describe('image signature key is not set', () => {
          before(() => {
            this.config.contentStore.imageSignatureKey = undefined;
            this.restHandler = proxyquire(`${rootFolder}/lib/content-store/rest-handler`, {
              crypto: {
                createHmac: this.createHmac,
                update: this.update,
                digest: this.digest,
              },
              request: this.request,
              '../../config/config': this.config,
            });
          });

          it('should return the original image object', () => {
            const getRecord = this.restHandler.get(slug);

            this.createHmac.should.not.have.been.called;

            return getRecord.should.become({
              meta: {
                type: 'page',
              },
              main: [
                {
                  type: 'image',
                  value: {
                    id: 2,
                    meta: {
                      type: 'images.Image',
                    },
                    slug: 'image-slug.jpeg',
                    version: 1,
                  },
                },
                {
                  type: 'figureList',
                  value: [{
                    id: 2,
                    meta: {
                      type: 'images.Image',
                    },
                    slug: 'image-slug.jpeg',
                    version: 1,
                  }],
                },
              ],
            });
          });
        });
      });
    });
  });

  describe('#transform', () => {
    const restHandler = rewire(`${rootFolder}/lib/content-store/rest-handler`);
    const transform = restHandler.__get__('transform');

    it('should return null if not given an object', () => {
      should.equal(transform('string'), null);
    });
  });

  describe('#preview', () => {
    // Same interface as #get
  });
});
