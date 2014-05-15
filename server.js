// Load modules
var express = require('express');
var path = require('path');
// Get configuration
var env = process.env.NODE_ENV || 'development';
var rootDir = path.dirname(require.main.filename);
var config = require(rootDir + '/app/config/config')[env];

// Configure express
var app = express();
require(rootDir + '/app/config/express')(app, config);

// Configure mongoose and Bootstrap models
require(rootDir + '/app/config/mongoose')(config);
// TODO: Bootstrap models

// Configure routes
require(rootDir + '/app/router')(app);

app.listen(app.get('port'));

