'use strict';

var request = require('request');
var config = require('../config');
var Promise = require('./promise');

module.exports = translate;

function translate(query, from, to) {
  if (arguments.length === 2) {
    to = from;
    from = 'auto';
  }

  return new Promise(function (resolve, reject) {
    var url = format(config.api, {
      query: query,
      from: from,
      to: to
    });

    request({
      url: url,
      json: true,
      headers: {
        'pragma': 'no-cache',
        'user-agent': ''
          + 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) '
          + 'AppleWebKit/537.36 (KHTML, like Gecko) '
          + 'Chrome/36.0.1985.18 Safari/537.36',
        'accept': '*/*',
        'cache-control': 'no-cache',
        'x-client-data': 'CP+1yQEIj7bJAQimtskBCKm2yQEIx4jKAQjQiMoB'
      }
    }, function (err, res, data) {
      if (err) {
        return reject(err);
      }

      if (res.statusCode !== 200) {
        return reject(new Error('HTTP Status ' + res.statusCode));
      }

      resolve(data);
    });
  });
}

function format(str, data) {
  return str
    .replace(/{{\s*(\w+)\s*}}/g, function (_, key) {
      return data[key] || _;
    });
}
