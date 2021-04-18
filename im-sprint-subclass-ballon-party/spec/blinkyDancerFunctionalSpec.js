require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const makeBlinkyDancer = require('../src/functional/blinkyDancer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { HTMLElement } = (new JSDOM('')).window;

describe('functional blinkyDancer', function() {

  var blinkyDancer;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = makeBlinkyDancer(10, 20, timeBetweenSteps);
  });

  it('element 객체가 존재해야 합니다', function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(HTMLElement);
  });

  it('setPosition 메소드를 사용할 수 있어야 합니다', function() {
    sinon.spy(blinkyDancer, 'setPosition');
    blinkyDancer.setPosition(10, 10);
    expect(blinkyDancer.setPosition.called).to.be.true;
  });
});
