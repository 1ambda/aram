
// Get ENV
var env = process.env.NODE_ENV || 'development';

// Get config

// Load npm modules
var mongoose = require('mongoose'),
    config = require('./config/config')[env];

// Connect mongoDB
var connect = function() {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};

connect();

// Error Handling when database error occurs

mongoose.connection.on('error', function(err) {
  console.log(err);
});

mongoose.connection.on('disconnected', function() {
  connect();
});
