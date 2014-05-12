
// Get ENV
var env = process.env.NODE_ENV || 'development';

// Load npm modules
var mongoose = require('mongoose'),
    config = require('./config/config')[env];


