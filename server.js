// Load modules
var express = require('express');
var mongoose = require('mongoose');

// Get configuration
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

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
// Bootstrap routes

// Configure express
var app = express();
require('./config/express')(app, config);
require('./config/router')(app);

app.listen(app.get('port'));

