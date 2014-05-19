var path = require('path');
var rootDir = path.dirname(require.main.filename);

var worker = function() {
  'use strict';
  
  var site = "https://accounts.openknowl.com/public",
      saveDir = './public/site-images/',
      imageDir = 'site-images/',
      format = 'jpg',
      tagToCapture = 'html',
      tagToTest = '#info-welcometext',
      script = require(rootDir + '/app/util/spooky');
  
  script(site, saveDir, imageDir, format, tagToCapture, tagToTest);
}
;

var second = 1000;
var repeatable;
var isWorking = false;

exports.start = function(req, res) {
  'use strict';
  
  if (!isWorking) {
    repeatable = setInterval(worker, second * 60);
    isWorking = true;
  }

  res.send();
};

exports.stop = function(req, res) {
  'use strict';
  
  if (isWorking) {
    clearInterval(repeatable);
    isWorking = false;
  }

  res.send();
};
