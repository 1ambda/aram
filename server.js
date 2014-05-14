// Load modules
var express = require('express');

// Get configuration
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];


// Configure express
var app = express();
require('./config/express')(app, config);

// Configure mongoose and Bootstrap models
require('./config/mongoose')(config);
// TODO: Bootstrap models

// Configure routes
require('./config/router')(app);

app.listen(app.get('port'));


