var mongoose = require('mongoose');

module.exports = function(config) {
  
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
};
