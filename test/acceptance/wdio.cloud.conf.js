/* eslint-disable no-param-reassign */

const config = require('../../config/config');
const wdioConfig = require('./wdio.conf.js').config;
const project = 'nhsuk';
const build = `nhsuk [${config.travis.jobNum}]`;
const maxInstances = 1;

exports.config = (function headlessConfig(globalConfig) {
  globalConfig.user = config.browserstack.user;
  globalConfig.key = config.browserstack.key;

  globalConfig.maxInstances = 5;

  globalConfig.host = 'hub.browserstack.com';
  globalConfig.port = 80;

  globalConfig.capabilities = [{
    browserName: 'safari',
    os: 'OS X',
    os_version: 'El Capitan',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'chrome',
    os: 'OS X',
    os_version: 'El Capitan',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'chrome',
    os: 'WINDOWS',
    os_version: '8.1',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'firefox',
    os: 'OS X',
    os_version: 'El Capitan',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'firefox',
    os: 'WINDOWS',
    os_version: '8.1',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'edge',
    os: 'Windows',
    os_version: '10',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'ie',
    version: '11',
    os: 'Windows',
    os_version: '10',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'ie',
    version: '10',
    os: 'Windows',
    os_version: '8',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'ie',
    version: '9',
    os: 'Windows',
    os_version: '7',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'ie',
    version: '8',
    os: 'Windows',
    os_version: '7',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'iPhone',
    platform: 'MAC',
    device: 'iPhone 5',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'iPad',
    platform: 'MAC',
    device: 'iPad 4th',
    project,
    build,
    maxInstances,
  }, {
    browserName: 'android',
    platform: 'ANDROID',
    device: 'Samsung Galaxy S5',
    project,
    build,
    maxInstances,
  }];

  globalConfig.onPrepare = globalConfig.onComplete = () => {
    return;
  };

  return globalConfig;
}(wdioConfig));
