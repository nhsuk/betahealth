/* globals dcsMultiTrack */

// Analytics Utility module
// This module offers ways to send custom events to analytics packages:
// - by calling analytics.send. Eg. analytics.send('name', 'value')
// - by adding the data-analytics attribute to any element that can be clicked
//   with a component type
//   eg <div data-analytics="anchor"/>
// It needs the analytics tracking code to be enabled on the page
const $ = require('jquery');

const Analytics = function Analytics() {
  this.attrName = 'analytics';
  this.wtPrefix = 'DCSext.';
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
    .on('mousedown.analytics', `[data-${this.attrName}]`, $.proxy(this._sendFromEvent, this));
};

Analytics.prototype.send = function send(...args) {
  if (this._wtExists()) {
    // add required args for webtrends call
    args.push('WT.dl', '121');

    try {
      // call webtrends track function with arguments
      dcsMultiTrack.apply(this, args);
    } catch (e) {
      throw e;
    }
  }
};

Analytics.prototype._sendFromEvent = function _sendFromEvent(e) {
  const params = this._getEventData(e);
  this.send.apply(this, params);
};

Analytics.prototype._getEventData = function _getEventData(e) {
  const $el = $(e.currentTarget);
  const component = $el.data('analytics');
  const componentType = $el.data('analytics-type');
  const params = [];
  let name;
  let value;

  switch (component) {
    case 'anchor':
      name = `${this.wtPrefix}Anchor`;
      value = $el.attr('href');
      break;
    case 'image':
      name = `${this.wtPrefix}Image`;

      if ($el.attr('srcset')) {
        value = $el.attr('srcset').split(',')[0].trim();
      } else {
        value = $el.attr('src');
      }

      break;
    case 'contents-navigation':
      name = `${this.wtPrefix}ContentsNavigation`;
      value = `${$el.data('step')}__${$el.attr('href')}`;
      break;
    case 'pagination':
      name = `${this.wtPrefix}Pagination`;
      value = $el.attr('rel');
      break;
    case 'external':
      name = `${this.wtPrefix}ExternalLinks`;
      value = $el.attr('href');
      break;
    case 'event':
      name = `${this.wtPrefix}Event`;
      value = $el.prop('tagName');
      break;
    default:
      name = `${this.wtPrefix}GeneralLinks`;
      value = component;
      break;
  }

  // push component name and value
  params.push(name, value);

  // if component has second level type
  if (componentType) {
    params.push(`${name}Type`, componentType);
  }

  return params;
};

Analytics.prototype._gaExists = function _gaExists() {
  return typeof ga === typeof Function;
};

Analytics.prototype._wtExists = function _wtExists() {
  return typeof dcsMultiTrack === typeof Function;
};

module.exports = new Analytics();
