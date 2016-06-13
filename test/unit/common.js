const chai = require('chai').use(require('sinon-chai')).use(require('chai-as-promised'));

// set mocha globals
global.chai = chai;
global.should = chai.should();
global.sinon = require('sinon');
global.appFolder = `${process.cwd()}/app`;

require('sinomocha')();

process.setMaxListeners(0);
process.stdout.setMaxListeners(0);
