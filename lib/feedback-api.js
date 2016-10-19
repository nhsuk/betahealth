const request = require('request');
const moment = require('moment-timezone');

const config = require('../config/config');

const FeedbackApi = function FeedbackApi() {
  this.API_BASEURL = config.feedbackApi.baseUrl;
  this.API_KEY = config.feedbackApi.apiKey;
};

function getCurrentTime() {
  return moment().tz('Europe/London').format('YYYY-MM-DD HH:mm:ss');
}

FeedbackApi.prototype.sendComment = function sendComment(formData) {
  return this.send({
    userId: '',
    jSonData: JSON.stringify(formData),
    text: formData.comment,
    pageId: formData.path,
    dateAdded: getCurrentTime(),
  });
};

FeedbackApi.prototype.send = function send(data) {
  return new Promise((resolve, reject) => {
    request({
      timeout: config.feedbackApi.timeout,
      method: 'POST',
      uri: this.API_BASEURL,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.API_KEY,
      },
      form: data,
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else if (!error && response.statusCode === 201) {
        resolve(body);
      } else {
        reject(new Error(response));
      }
    });
  });
};

module.exports = new FeedbackApi();
