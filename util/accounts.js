module.exports = function(site) {
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
      e = new Error('Failed to initialize SpookyJS');
      e.details = err;
      throw e;
    }

    spooky.start(site);
    spooky.then(function () {
      var current = new Date();
      this.captureSelector("./site-images/"+ current.toLocaleString() + '.jpg',
			   'html', {
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
