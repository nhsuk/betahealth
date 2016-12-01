const chai = require('chai').use(require('sinon-chai')).use(require('chai-as-promised'));
const sinon = require('sinon');
const sinonStubPromise = require('sinon-stub-promise');
const proxyquire = require('proxyquire');

// set mocha globals
global.chai = chai;
global.should = chai.should();
global.sinon = sinon;
global.sinonStubPromise = sinonStubPromise(sinon);
global.proxyquire = proxyquire;
global.appFolder = `${process.cwd()}/app`;
global.rootFolder = `${process.cwd()}`;

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
