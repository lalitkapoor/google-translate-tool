'use strict';

var chalk = require('chalk');
var translate = require('./translate');
var isOption = RegExp.prototype.test.bind(/^--[^-]+/);
var defaultOptions = {
  from: 'auto',
  to: 'en',
  json: false,
  perty: false
};

module.exports = function (argv) {
  var query, options;
  
  argv = parseArgv(argv);

  options = argv.options;
  query = argv.argv.join(' ') || '';

  translate(query, options.from, options.to)
    .then(function (data) {
      print(data, options);
    }, function (err) {
      console.log('  %s:', chalk.magenta('Error'));
      console.log();
      console.log('  %s' + err.message);
      console.log();
    });
};

function parseArgv(argv) {
  var options = Object.create(defaultOptions);
  var newArgv =[];
  var len = argv.length;
  var str, prev, key;

  while (len--) {
    str = argv[len];

    if (isOption(str)) {
      if (!~str.indexOf('=')) {
        key = str.slice(2);
        if (prev !== undefined && typeof options[key] === 'string') {
          options[key] = prev;
          newArgv.pop();
        } else if (typeof options[key] === 'boolean') {
          options[key] = !options[key];
        }
      } else {
        str = str.substr(2).split('=');
        options[str[0]] = str[1];
      }
    } else {
      newArgv.push(str);
    }

    prev = str;
  };

  return {
    options: options,
    argv: newArgv
  };
}

function print(data, options) {
  if (options.json) {
    if (options.perty) {
      console.log(JSON.stringify(data, null, 4));
    } else {
      console.log(JSON.stringify(data));
    }
  } else {
    console.log();
    console.log('  %s => %s', chalk.cyan(options.from), chalk.cyan(options.to));
    console.log();

    if (data.sentences || data.dict) {
      isNotEmpty(data.sentences) && printSentences(data.sentences)
      isNotEmpty(data.dict) && printDict(data.dict)
    } else {
      console.log(chalk.magenta('  No results.'));
      console.log();
    }
  }
}

function printSentences(sentences) {
  sentences.forEach(function (item) {
    console.log('  %s %s', item.trans, chalk.magenta('[' + item.translit + ']'));
    console.log();
  });
}

function printDict(dict) {
  dict.forEach(function (item) {
    console.log('  %s', chalk.yellow(item.pos));

    if (isNotEmpty(item.entry)) {
      console.log();
      printEntry(item.entry);
    }

    console.log();
  });
}

function printEntry(entry) {
  entry.forEach(function (item) {
    var reverse = item.reverse_translation.join(', '); 
    console.log('    %s %s', chalk.cyan(item.word), reverse);
  });
}

function isNotEmpty(data) {
  return Array.isArray(data) && data.length > 0;
}
