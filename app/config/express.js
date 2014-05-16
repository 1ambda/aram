var morgan = require('morgan'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    // favicon = require('serve-favicon'),
    ejs = require('ejs'),
    path = require('path'),
    express = require('express');

// Set ejs tag
// ejs.open = '{{';
// ejs.close = '}}';

module.exports = function(app, config) {
  'use strict';
  
  var env = config.mode || 'development';
  var port = config.port || process.env.PORT || 3000;
  var rootDir = path.dirname(require.main.filename);

  // Set application config
  app.set('port', port);
  app.set('views', path.join(rootDir, 'app/views'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');
  
  // Use middlewares
  app.use(express.static(path.join(rootDir, 'public')));
  app.use(methodOverride());
  app.use(bodyParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use(cookieParser());
  app.use(session({secret: 'secret-key'}));
  app.use(errorHandler());
  // app.use(favicon(__dirname + '/public/favicon.ico'));

  // Depoly options
  if(env === 'development') {
    app.use(morgan('dev'));
    console.log('\n\tStarting Express PORT : ' + port + "\n");
  }

  if(env === 'production') {
    // winston : http://nodeqa.com/nodejs_ref/5
  }

};
