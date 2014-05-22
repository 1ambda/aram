module.exports =
  function(siteName, url, saveDir, imageDir, format,
	   tagToCapture, tagToTest, done) {
    'use strict';

    var mongoose = require('mongoose');
    var path = require('path');
    var rootDir = path.dirname(require.main.filename);
    var isServiceDead = false;

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
	console.log((new Date).toLocaleString() + ': service [' + siteName + '] died');

	// restart knowlath
	if (siteName === 'accounts') {
	  console.log('restarting service [' + siteName + ']...');

	  var exec = require('child_process').exec;
	  exec("node /home/knowlauth/restart.js", 
		  function(err, stdout, stderr) {
		    if (err) {
		      console.log('err : ' + err);
		    }

		    console.log((new Date).toLocaleString() + ': service [accounts] started');
		    done();
		  });

	  // restart(done);
	} else {
	  done();
	}
      } else {
	console.log((new Date).toLocaleString() + ': service [' + siteName + '] alive');
	done();
      }
    });

    spooky.on('save', function(object) {
      var Status = mongoose.model('Status');
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
