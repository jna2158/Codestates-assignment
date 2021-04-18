if (typeof window === 'undefined') {
  var makeDancer = require('./dancer');
} // you don't have to worry about this code. this is for testing.

var makeBlinkyDancer = (top, left, timeBetweenSteps) => {
  const blinkyDancer = makeDancer(top, left, timeBetweenSteps);

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
  let oldStep = blinkyDancer.step;

  blinkyDancer.step = () => {
    // call the old version of step at the beginning of any call to this new version of step
    oldStep();

    let style = blinkyDancer.$node.style;
    style.display = style.display === 'none' ? 'inline-block' : 'none';
  };

  return blinkyDancer;
};

// you don't have to worry about this code. this is for testing.
if (typeof window === 'undefined') {
  module.exports = makeBlinkyDancer;
}
