var path = require('path');
var rootDir = path.dirname(require.main.filename);
var home = require(path.join(rootDir, 'app/controllers/home'));
var spooky = require(rootDir + '/app/controllers/spooky');

module.exports = function(app) {
  'use strict';

  var express = require('express');
  var api = express.Router();

  api.use(function(req, res, next){
    next();
  });

  api.route('/')
    .get(home.index);

  api.route('/api/v1/spooky/start')
    .get(spooky.start);

  api.route('/api/v1/spooky/stop')
    .get(spooky.stop);

  app.use('/', api);
};
