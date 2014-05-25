'use strict';

var bluebird;

if (typeof Promise === 'undefined') {
  try {
    bluebird = require('bluebird');
  } catch (e) {
    console.log();
    console.log('  Your Node.js is too old. Please run the following command to support Promise.');
    console.log('  npm i --save bluebird');
    console.log();
    throw e;
  }

  module.exports = bluebird;
} else {
  module.exports = Promise;
}
