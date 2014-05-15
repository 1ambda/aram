module.exports = function(site) {
  'use strict';
  
  var Spooky;
  try {
    Spooky = require('spooky');
  } catch (e) {
    Spooky = require('../lib/spooky');
  }

  var spooky = new Spooky({
    child: {
      transport: 'http'
    },
    casper: {
      logLevel: 'debug',
      verbose: true
    }
  }, function (err) {
    if (err) {
      err = new Error('Failed to initialize SpookyJS');
      err.details = err;
      throw err;
    }

    spooky.start(site);
    spooky.then(function () {
      var current = new Date();
      var dateString = current.toLocaleString('en-US').replace(/\s/g, '_');
      this.captureSelector("./public/site-images/"+ dateString +'.jpg', 'html', {
	format: "jpg",
	quality: "100"
      });
    });
    spooky.run();
  });

  spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
      console.log(stack);
    }
  });

   spooky.on('console', function (line) {
   console.log(line);
   });

  spooky.on('hello', function (greeting) {
    console.log(greeting);
  });

  spooky.on('log', function (log) {
    if (log.space === 'remote') {
      console.log(log.message.replace(/ \- .*/, ''));
    }
  });
};