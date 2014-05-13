
// Get ENV
var env = process.env.NODE_ENV || 'development';

// Get config
var config = require('./config/config')[env];

var worker = require('./util/accounts');


var site = "https://accounts.openknowl.com/public";

worker(site);
