module.exports =
  function(siteName, url, saveDir, imageDir, format,
	   tagToCapture, tagToTest, done, action) {
    'use strict';

    // Load models
    var mongoose = require('mongoose'),
	Action = mongoose.model('Action'),
	Status = mongoose.model('Status');

    // Get rootDir
    var path = require('path'),
	rootDir = path.dirname(require.main.filename);

    // Variable to check whether the service is dead
    var isServiceDead = false;

    // Init spooky
    var Spooky;
    try {
      Spooky = require('spooky');
    } catch (e) {
      console.log('spooky require exception');
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
	var e = new Error('Failed to initialize SpookyJS');
	e.details = err;
	console.log('new Spooky err');
	throw e;
      }

      var second = 1000;
      
      spooky.start(url);
      spooky.wait(10 * second , function() {
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

    // spooky.on('console', function (line) {
    //   console.log(line);
    // });

    spooky.on('error', function (e, stack) {
      console.error(e);
      if (stack) {
	console.log(stack);
      }

      console.log('spooky.on error');
      done();
    });

    spooky.on('run.complete', function() {

      if (isServiceDead) {
	console.log((new Date()).toLocaleString() + ': service [' + siteName + '] died');

	// restart logic
	if (action) {

	  var script = require(rootDir + '/actions/' + action);
	  
	  // save action history
	  var history = new Action({
	    siteName: siteName,
	    actionFile: rootDir + '/actions/' + action,
	    actionFunction: script.toString()
	  });

	  history.save(function(err) {
	    if (err) {
	      console.log('Failed to save action history');
	    }
	  
	    // do action for service
	    console.log('do action for service [' + siteName + ']...');
	    script(siteName, done);
	  });

	} else {
	  done();
	}
      } else {
	console.log((new Date()).toLocaleString() + ': service [' + siteName + '] alive');
	done();
      }
    });

    spooky.on('save', function(object) {
      var status = new Status(object);

      if (status.serviceStatus === 'dead') {
	isServiceDead = true;
      }

      status.save(function(err) {
	if (err) {
	  console.log(err);
	}
      });
    });
  };
