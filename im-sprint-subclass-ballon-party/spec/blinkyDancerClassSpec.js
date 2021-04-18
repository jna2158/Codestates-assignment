require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const BlinkyDancerClass = require('../src/class/BlinkyDancerClass');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { HTMLElement } = (new JSDOM('')).window;

describe('es6 class blinkyDancer', function() {

  var blinkyDancer, clock;
  var timeBetweenSteps = 100;

  function isClass(v) {
    return typeof v === 'function' && /^\s*class\s+/.test(v.toString());
  }

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancerClass(10, 20, timeBetweenSteps);
  });

  it('class keyword를 사용해서 구현되어야 합니다', function() {
    expect(isClass(BlinkyDancerClass)).to.be.equal(true);
  });

  it('element 객체가 존재해야 합니다', function() {
    expect(blinkyDancer.$node).to.be.an.instanceof(HTMLElement);
  });

  it('setPosition 메소드를 사용할 수 있어야 합니다', function() {
    sinon.spy(blinkyDancer, 'setPosition');
    blinkyDancer.setPosition(10, 10)
    expect(blinkyDancer.setPosition.called).to.be.true;
  });
});
