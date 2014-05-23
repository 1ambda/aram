var path = require('path');
var rootDir = path.dirname(require.main.filename);
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require(rootDir + '/config/config')[env];
var fs = require('fs');
var async = require('async');

// Connect mongoDB
mongoose.connect(config.db);

// Bootstrap models 'Status'
require(rootDir + '/models/status');
require(rootDir + '/models/action');

var second = 1000;


// Handle uncaught exception
process.on('uncaughtException', function(err) {
  console.log(err);
});

var makeWorker = function(requirement, done) {
  'use strict';

  // Args for /util/spooky.js
  var saveDir = '../public/site-images/',
      imageDir = 'site-images/',
      format = 'png',
      script = require(rootDir + '/util/spooky'),
      tagToCapture = 'body',
      action = null; // action could be null if not defined in config.js

  if (requirement.action) {
    action = requirement.action;
  }

  return function() {
    script(requirement.siteName, requirement.url, saveDir, imageDir, format,
	   tagToCapture, requirement.tagToTest, done, action);
  };
};


async.forever(
  function(next) {

    setTimeout(makeWhilst(), 120 * second);
    
    function makeWhilst () {
      var count  = 0;

      // Get requirements from config.js
      var requirements = require(rootDir + '/config/requirements').context;
      
      if (!requirements) {
	var err = new Error('Can\'t find requirements. Check your config.js');
	throw err;
      }
      
      return function () {
	async.whilst(
	  function() { return count < requirements.length; },
	  function(callback) {
	    makeWorker(requirements[count++], callback)();
	  },
	  function(err) {
	    next();
	  }
	);
      };
    }
  },
  function(err) {}
);


