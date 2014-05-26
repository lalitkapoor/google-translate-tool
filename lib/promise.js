'use strict';

var chalk = require('chalk');
var bluebird;

if (typeof Promise === 'undefined') {
  try {
    bluebird = require('bluebird');
  } catch (e) {
    console.log();
    console.log('  Your Node.js is %s.', chalk.magenta('too old'));
    console.log('  Please run the following command to support Promise.');
    console.log();
    console.log('  $ %s i --save %s', chalk.cyan('npm'), chalk.blue('bluebird'));
    console.log();
    throw e;
  }

  module.exports = bluebird;
} else {
  module.exports = Promise;
}
