if (typeof window === 'undefined') {
  var jsdom = require('jsdom');
  var { JSDOM } = jsdom;
  var { document } = (new JSDOM('')).window;
} // you don't have to worry about this code. this is for testing.

// Creates and returns a new dancer object that can step
var makeDancer = (top, left, timeBetweenSteps) => {
  const dancer = {};

  const createDancerElement = () => {
    let elDancer = document.createElement('span');
    elDancer.className = 'dancer';
    return elDancer;
  };

  dancer.$node = createDancerElement();

  dancer.step = () => {
    // the basic dancer doesn't do anything interesting at all on each step,
    // it just schedules the next step
    setTimeout(dancer.step, timeBetweenSteps);
  };

  dancer.setPosition = (top, left) => {
    // Use css top and left properties to position our <span> tag
    Object.assign(dancer.$node.style, {
      top: `${top}px`,
      left: `${left}px`
    });
  };

  dancer.step();
  // now that we have defined the dancer object, we can start setting up important parts of it by calling the methods we wrote
  // this one sets the position to some random default point within the body
  dancer.setPosition(top, left);

  return dancer;
};

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = makeDancer;
}
