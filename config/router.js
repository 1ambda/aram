var home = require('../app/controllers/home');
var spooky = require('../app/controllers/spooky');

module.exports = function(app) {

  var express = require('express');
  var api = express.Router();

  api.use(function(req, res, next){
    next();
  });

  api.route('/')
    .get(home.index);

  api.route('/spooky/start')
    .get(spooky.start);

  api.route('/spooky/stop')
    .get(spooky.stop);

  app.use('/', api);
};
