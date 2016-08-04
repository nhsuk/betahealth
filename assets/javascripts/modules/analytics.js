/* globals dcsMultiTrack */

// Analytics Utility module
// This module offers ways to send custom events to analytics packages:
// - by calling analytics.send. Eg. analytics.send('name', 'value')
// - by adding the data-analytics attribute to any element that can be clicked
//   eg <div data-analytics="name1,value1,name2,value2"/>
// It needs the analytics tracking code to be enabled on the page
const $ = require('jquery');

const Analytics = function Analytics() {
  this.attrName = 'analytics';
};

Analytics.prototype.init = function init() {
  this.cacheEls();
  this.bindEvents();
};

Analytics.prototype.cacheEls = function cacheEls() {
  this.$body = $('body');
};

Analytics.prototype.bindEvents = function bindEvents() {
  this.$body
    .on('click.analytics', `[data-${this.attrName}]`, $.proxy(this._sendFromEvent, this));
};

Analytics.prototype.send = function send(...args) {
  if (this._wtExists()) {
    // add required args for webtrends call
    args.push('WT.dl');
    args.push('121');

    try {
      // call webtrends track function with arguments
      dcsMultiTrack.apply(this, args);
    } catch (e) {
      throw e;
    }
  }
};

Analytics.prototype._sendFromEvent = function _sendFromEvent(e) {
  const analyticsParams = $(e.target).data(this.attrName).split(',');
  this.send.apply(this, analyticsParams);
};

Analytics.prototype._gaExists = function _gaExists() {
  return typeof ga === typeof Function;
};

Analytics.prototype._wtExists = function _wtExists() {
  return typeof dcsMultiTrack === typeof Function;
};

module.exports = new Analytics();
