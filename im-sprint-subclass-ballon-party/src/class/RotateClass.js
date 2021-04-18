/* global DancerClass */
if (typeof window === 'undefined') {
    global.DancerClass = require('./DancerClass');
  } // you don't have to worry about this code. this is for testing.

  class RotateDancerClass extends DancerClass{
    constructor(top,left,timeBetweenSteps) {
      super(top,left,timeBetweenSteps);
    }
    step() {
      //다형성을 이용해서 부모의 step을 불러와야 함
      super.step(this);
      let style = this.$node.style;
      style.borderRadius = '0px';
      if(style.transform === 'rotate(90deg)') {
        style.transform = 'rotate(45deg)';
      }
      else {
        style.transform = 'rotate(90deg)';
      }
    }
  }
  
  // you don't have to worry about this code. this is for testi ng.
  if (typeof window === 'undefined') {
    module.exports = RotateDancerClass;
  }
  