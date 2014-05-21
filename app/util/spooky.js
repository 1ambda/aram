module.exports =
  function(siteName, url, saveDir, imageDir, format,
	   tagToCapture, tagToTest, done) {
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
	verbose: true 
      }
    }, function (err) {
      if (err) {
	err = new Error('Failed to initialize SpookyJS');
	err.details = err;
	throw err;
      }

      spooky.setMaxListeners(15);

      spooky.start(url);
      spooky.wait(10000, function() {
	this.setMaxListeners(15);
      });
      spooky.then([{
	siteName: siteName,
	url: url,
	saveDir: saveDir,
	imageDir: imageDir,
	format: format,
	tagToCapture: tagToCapture,
	tagToTest: tagToTest,
	done: done
      }, function () {

	var current = new Date();
	var dateString = current.toLocaleString('en-US').replace(/\s/g, '_');
	this.captureSelector(saveDir + siteName + '_' + dateString + '.' + format, tagToCapture, {
	  format: format
	  // quality: "100",
	});

	this.emit('save', {
	  siteName: siteName,
	  url: url,
	  date: current,
	  imagePath: imageDir + siteName + '_' + dateString + '.' + format,
	  serviceStatus: this.exists(tagToTest) ? 'alive' : 'dead'
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

    spooky.on('save', function(object) {
      var Status = mongoose.model('Status');
      var status = new Status(object);

      status.save(function(err) {
	if (err) {
	  console.log(err);
	  
	  return;
	}

	console.log('saved: ' + object.siteName);
      });
    });
  };
