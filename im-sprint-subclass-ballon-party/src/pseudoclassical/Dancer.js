if (typeof window === "undefined") {
  var jsdom = require("jsdom");
  var { JSDOM } = jsdom;
  var { document } = new JSDOM("").window;
} // you don't have to worry about this code. this is for testing.

// Dancer를 pseudoclassical한 방식으로 리팩토링하세요
// 참고로, constructor는 대문자로 이름을 시작하는 것이 관례입니다
function Dancer(top,left,timeBetweenSteps) {
  
  const createDancerElement = function () {
    let elDancer = document.createElement('span');
    elDancer.className = 'dancer';
    return elDancer;
  }

  this.top = top;
  this.left = left;
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = createDancerElement(); //나중에
  this.step();
  this.setPosition(top, left);
  
}


  Dancer.prototype.step = function() {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }

  Dancer.prototype.setPosition = function(top, left) {
    Object.assign(this.$node.style, {
      top: `${top}px`,
      left: `${left}px`
    });
  }

  Dancer.prototype.addDancerEvent = function(eventFn) {
    this.$node.addEventListener('click', eventFn);
  }

  Dancer.prototype.render = function(target) {
    target.appendChild(this.$node);
  }

  Dancer.prototype.lineUp = function() {
    this.$node.style.transform = `translate(120%, 50%)`;
  }

  Dancer.prototype.scale = function() {
    this.$node.style.transform = `scale(2, 0.5)`;
  }
  
  Dancer.prototype.rotate = function() {
    this.$node.style.transform = `rotate(90deg)`;
  }

  

// you don't have to worry about this code. this is for testing.
if (typeof window === "undefined") {
  module.exports = Dancer;
}