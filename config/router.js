module.exports = function(app) {

  var express = require('express');
  var router = express.Router();

  router.use(function(req, res, next) {
    // do whatever
    next();
  });

  router.get('/', function(req, res) {
    res.render('index', { title : 'Hello Express4',
			  text : 'Welcome!' });
  });

  app.use('/', router);
};
