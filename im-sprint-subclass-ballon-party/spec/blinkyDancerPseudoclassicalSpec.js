require('mocha');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const Dancer = require('../src/pseudoclassical/Dancer');
const BlinkyDancer = require('../src/pseudoclassical/BlinkyDancer');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { HTMLElement } = (new JSDOM('')).window;

describe('pseudoclassical blinkyDancer', function() {

  var blinkyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    blinkyDancer = new BlinkyDancer(10, 20, timeBetweenSteps);
  });

  it('pseudoclassical 한 방법으로 구현되어야 합니다', function() {
    expect(blinkyDancer).to.be.an.instanceof(Dancer);
    expect(blinkyDancer).to.be.an.instanceof(BlinkyDancer);
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
