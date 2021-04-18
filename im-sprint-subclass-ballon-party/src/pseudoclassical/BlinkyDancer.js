if (typeof window === 'undefined') {
  var Dancer = require('./Dancer');
} // you don't have to worry about this code. this is for testing.

// blinkyDancer를 pseudoclassical한 방식으로 리팩토링하세요
// 참고로, constructor는 대문자로 이름을 시작하는 것이 관례입니다
function BlinkyDancer (top, left, timeBetweenSteps) {
  Dancer.call(this, top, left, timeBetweenSteps); 
  
}

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

// BlinkyDancer.prototype.oldStep = function() {
//   this.step;
// }

BlinkyDancer.prototype.step = function() {
  Dancer.prototype.step.call(this);
  let style = this.$node.style;
  style.display = style.display === 'none' ? 'inline-block' : 'none';

  
}


// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = BlinkyDancer;
}