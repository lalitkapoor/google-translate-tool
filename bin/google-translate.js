#!/usr/bin/env node

'use strict';

var chalk = require('chalk');
var cli = require('../lib/cli');
var pkg = require('../package');

if (!process.argv[2]) {
  var command = chalk.green('google-translate');
  console.log();  
  console.log('  %s v%s', chalk.cyan(pkg.name), chalk.cyan(pkg.version));
  console.log('  http://githib.com/poying/google-translate-tool');
  console.log();
  console.log('  Commands:');
  console.log();
  console.log('    %s <word>', command);
  console.log('    %s <sentence>', command);
  console.log();
  console.log('  Options:');
  console.log();
  console.log('    %s    Language name (default: auto)', chalk.green('--from'));
  console.log('    %s      Language name (default: en)', chalk.green('--to'));
  console.log('    %s    Output JSON format', chalk.green('--json'));
  console.log('    %s', chalk.green('--perty'));
  console.log();  
} else {
  cli(process.argv.slice(2));
}
