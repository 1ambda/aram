var path = require('path');
var rootDir = path.dirname(require.main.filename);
var home = require(path.join(rootDir, 'app/controllers/home'));
var image = require(rootDir + '/app/controllers/image');

module.exports = function(app) {
  'use strict';

  var express = require('express');
  var api = express.Router();

  api.use(function(req, res, next){
    next();
  });

  api.route('/')
    .get(home.index);

  api.route('/api/v1/image/:site').
    get(image.getSiteStatusBySiteName);

  api.route('/api/v1/images').
    get(image.getSiteStatus);

  app.use('/', api);
};
