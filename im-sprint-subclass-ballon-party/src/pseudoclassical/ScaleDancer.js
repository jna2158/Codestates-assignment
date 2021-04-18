/* global Dancer */
if (typeof window === 'undefined') {
    global.Dancer = require('./Dancer');
  } // you don't have to worry about this code. this is for testing.

  function ScaleDancer (top, left, timeBetweenSteps) {
      Dancer.call(this, top, left, timeBetweenSteps)
  }

  ScaleDancer.prototype = Object.create(Dancer.prototype);
  ScaleDancer.prototype.constructor = ScaleDancer;
  ScaleDancer.prototype.step = function() {
    Dancer.prototype.step.call(this);

    let style = this.$node.style;

    if(style.transform === 'scale(2, 0.5)') {
      style.transform = 'scale(1, 0.1)';
    }
    else {
      style.transform = 'scale(2, 0.5)'
    }

  }


  // you don't have to worry about this code. this is for testi ng.
  if (typeof window === 'undefined') {
    module.exports = ScaleDancer;
  }
  