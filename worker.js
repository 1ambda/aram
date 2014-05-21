var path = require('path');
var rootDir = path.dirname(require.main.filename);
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require(rootDir + '/app/config/config')[env];
var fs = require('fs');
var async = require('async');

// Connect mongoDB
mongoose.connect(config.db);

// Bootstrap models 'Status'
require(rootDir + '/app/models/status');
var requirements = [
  { "siteName" : 'accounts',
    "url" : "https://accounts.openknowl.com/public",
    "tagToTest" : '#info-welcometext' },
  { "siteName" : 'company',
    "url" : "https://company.openknowl.com/",
    "tagToTest" : '#sidebar' },
  { "siteName" : 'camp',
    "url" : "https://camp.openknowl.com/",
    "tagToTest" : '#carousel' },
  { "siteName" : 'planner',
    "url" : "https://planner.openknowl.com/home",
    "tagToTest" : 'link' }
];

var makeWorker = function(requirement, done) {
  'use strict';

  var saveDir = './public/site-images/',
      imageDir = 'site-images/',
      format = 'png',
      script = require(rootDir + '/app/util/spooky'),
      tagToCapture = 'body';

  return function() {
    script(requirement.siteName, requirement.url, saveDir, imageDir, format,
	   tagToCapture, requirement.tagToTest, done);
  };
};

var second = 1000;

async.forever(
  function(next) {
    var count  = 0;
    
      async.whilst(
	function() { return count < requirements.length; },
	function(callback) {
	  makeWorker(requirements[count++], callback)();
	},
	function(err) {
	  next();
	}
      );
  },
  function(err) {}
);


