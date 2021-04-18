if (typeof window === 'undefined') {
  var jsdom = require('jsdom');
  var { JSDOM } = jsdom;
  var { document } = (new JSDOM('')).window;
} // you don't have to worry about this code. this is for testing.

class DancerClass {
  constructor(top,left,timeBetweenSteps) {
    this.top = top;
    this.left = left;
    this.timeBetweenSteps = timeBetweenSteps;
    this.$node = this.createDancerElement();
    this.step();
    this.setPosition(top,left);
  }
  createDancerElement() {
    let elDancer = document.createElement('span');
    let elImg = document.createElement('img');
    elDancer.className = 'dancer';
    elImg.setAttribute("src", "img/물풍선.png")
    elImg.setAttribute("height", "120");
    elImg.setAttribute("width", "120");

    function play () {
      let audio = document.querySelector('audio');
      audio.play();
    }

    elImg.addEventListener('click', function () {
      elImg.setAttribute("src", "img/물줄기.png");
      play();
      setTimeout(function effectOff() {
        elDancer.removeChild(elImg);
      }, 700);
    });

    elDancer.appendChild(elImg);
    return elDancer;
  }
  
  step() {
    setTimeout(this.step.bind(this), this.timeBetweenSteps);
  }

  setPosition(top, left) {
    Object.assign(this.$node.style, {
      top: `${top}px`,
      left: `${left}px`
    });
  }

  addDancerEvent(eventFn) {
    this.$node.addEventListener('click', eventFn);
  }

  render(target) {
    target.appendChild(this.$node);
  }

  lineUp() {
    this.$node.style.transform = `translate(120%, 50%)`;
  }

  scale() {
    this.$node.style.transform = `scale(1, 1)`;
  }

  rotate() {
    this.$node.style.transform = `rotate(90deg)`;
  }

}
// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = DancerClass;
}
