var mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    rootDir = path.dirname(require.main.filename),
    modelDir = path.join(rootDir, 'app/models');

module.exports = function(config) {
  'use strict';
  // Connect mongoDB
  var connect = function() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect(config.db, options);
  };

  connect();

  // Handle mongoDB connection
  mongoose.connection.on('error', function(err) {
    console.log(err);
  });

  mongoose.connection.on('disconnected', function() {
    connect();
  });

  // Bootstrap models
  fs.readdirSync(modelDir).forEach(function(file){
    if ( ~file.indexOf('.js') ) {
      require(modelDir + '/' + file);
    }
  });
};
