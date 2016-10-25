const moment = require('moment-timezone');

const config = {
  feedbackApi: {
    baseUrl: 'http://api-baseurl.com/',
    apiKey: 'APIKEY123456789',
    timeout: 5000,
  },
};
const fakeTime = moment('2016-06-24').tz('Europe/London').startOf('day');

describe('feedback api library', () => {
  beforeEach(() => {
    this.sandbox = sinon.sandbox.create();
    this.request = this.sandbox.stub();
    this.clock = this.sandbox.useFakeTimers(fakeTime.valueOf());

    this.feedbackApi = proxyquire(`${rootFolder}/lib/feedback-api`, {
      request: this.request,
      '../config/config': config,
    });
  });

  afterEach(() => {
    this.sandbox.restore();
  });

  describe('#send', () => {
    it('should return form data if api returns 201 status code', () => {
      const formData = {
        text: 'Some feedback text',
        pageId: 'http://some-url.com/',
      };

      this.request.yields(null, { statusCode: 201 }, formData);

      const send = this.feedbackApi.send(formData);

      this.request.should.have.been.calledWith({
        method: 'POST',
        uri: config.feedbackApi.baseUrl,
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': config.feedbackApi.apiKey,
        },
        form: formData,
        timeout: 5000,
      });
      return send.should.eventually.deep.equal(formData);
    });

    it('should return an error if api returns a non 201 status code', () => {
      this.request.yields(null, { statusCode: 404 }, null);

      return this.feedbackApi.send()
        .should.be.rejectedWith();
    });

    it('should return an error if api returns an error', () => {
      const apiError = new Error('API error');

      this.request.yields(apiError, null, null);

      return this.feedbackApi.send()
        .should.be.rejectedWith(apiError);
    });
  });

  describe('#sendComment', () => {
    beforeEach(() => {
      this.sandbox.stub(this.feedbackApi, 'send').returnsArg(0);
    });

    it('should call send() with form data', () => {
      const formData = {
        comment: 'my comment',
        path: 'http://feedback-url.com',
      };
      const sendComment = this.feedbackApi.sendComment(formData);

      sendComment.should.deep.equal({
        userId: '',
        jSonData: JSON.stringify(formData),
        text: formData.comment,
        pageId: formData.path,
        dateAdded: '2016-06-24 00:00:00',
      });
    });
  });
});
