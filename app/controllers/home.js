exports.index = function(req, res) {
  'use strict';

  var fs = require('fs');
  var path = require('path'),
      rootDir = path.dirname(require.main.filename);
  
  // read image files synchronously
  var files = [];
  var imagePath = path.join(rootDir, 'public/site-images');

  fs.readdirSync(imagePath).forEach(function(image) {
    if (~image.indexOf('.jpg')) {
      files.push(image);
    }
  });

  res.render('index');
};

