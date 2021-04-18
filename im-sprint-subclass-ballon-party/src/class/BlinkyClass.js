/* global DancerClass */
if (typeof window === 'undefined') {
  global.DancerClass = require('./DancerClass');
} // you don't have to worry about this code. this is for testing.

class BlinkyDancerClass extends DancerClass{
  constructor(top,left,timeBetweenSteps) {
    super(top,left,timeBetweenSteps);
  }
  step() {
    //다형성을 이용해서 부모의 step을 불러온다.
    super.step(this);
    let style = this.$node.style;
    style.display = style.display === 'none' ? 'inline-block' : 'none';
  }
}

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = BlinkyDancerClass;
}
