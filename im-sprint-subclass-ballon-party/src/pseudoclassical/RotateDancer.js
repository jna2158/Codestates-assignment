/* global Dancer */
if (typeof window === 'undefined') {
    global.Dancer = require('./Dancer');
  } // you don't have to worry about this code. this is for testing.

  function RotateDancer (top,left,timeBetweenSteps) {
    Dancer.call(this, top,left,timeBetweenSteps)
  }

  RotateDancer.prototype = Object.create(Dancer.prototype);
  RotateDancer.prototype.constructor = RotateDancer;
  RotateDancer.prototype.step = function() {
    Dancer.prototype.step.call(this);

    let style = this.$node.style;
      style.borderRadius = '0px';

      if(style.transform === 'rotate(90deg)') {
        style.transform = 'rotate(45deg)';
      }
      else {
        style.transform = 'rotate(90deg)';
      }

  }


  
  // you don't have to worry about this code. this is for testi ng.
  if (typeof window === 'undefined') {
    module.exports = RotateDancer;
  }