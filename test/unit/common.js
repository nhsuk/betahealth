const chai = require('chai').use(require('sinon-chai')).use(require('chai-as-promised'));
const sinon = require('sinon');
const proxyquire = require('proxyquire');

require('sinomocha')();

// set mocha globals
global.chai = chai;
global.should = chai.should();
global.sinon = sinon;
global.proxyquire = proxyquire;
global.appFolder = `${process.cwd()}/app`;
global.rootFolder = `${process.cwd()}`;

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
