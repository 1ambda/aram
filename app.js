
// Get ENV
var env = process.env.NODE_ENV || 'development';

// 
var mongoose = require('mongoose'),
    config = require('/config/config')[env];




console.log("ENV : " + env);


