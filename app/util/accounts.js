module.exports =
  function(site, saveDir, imageDir, format, tagToCapture, tagToTest) {
    'use strict';

    var mongoose = require('mongoose');

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
	verbose: false 
      }
    }, function (err) {
      if (err) {
	err = new Error('Failed to initialize SpookyJS');
	err.details = err;
	throw err;
      }

      spooky.start(site);
      spooky.then([{
	site: site,
	saveDir: saveDir,
	imageDir: imageDir,
	format: format,
	tagToCapture: tagToCapture,
	tagToTest: tagToTest
      }, function () {
	var current = new Date();
	var dateString = current.toLocaleString('en-US').replace(/\s/g, '_');
	this.captureSelector(saveDir + dateString + '.' + format, tagToCapture, {
	  format: format,
	  quality: "100"
	});

	this.emit('save', {
	  site: site,
	  date: current,
	  imagePath: imageDir + dateString + '.' + format,
	  serviceStatus: this.exists(tagToTest) ? true : false
	});
      }]);
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

    spooky.on('log', function (log) {
      if (log.space === 'remote') {
	console.log(log.message.replace(/ \- .*/, ''));
      }
    });

    spooky.on('save', function(object) {
      var Status = mongoose.model('Status');
      var status = new Status(object);

      status.save(function(err) {
	if (err) {
	  console.log(err);
	  return;
	}
      });
    });
  };
