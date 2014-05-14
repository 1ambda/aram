var home = require('../app/controllers/home');

module.exports = function(app) {

  var express = require('express');
  var api = express.Router();

  api.use(function(req, res, next){
    next();
  });

  api.route('/')
    .get(home.index);

  app.use('/', api);
};
