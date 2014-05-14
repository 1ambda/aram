var worker = function() {
  'use strict';

  var site = "https://accounts.openknowl.com/public";
  var script = require('../../util/accounts');
  script(site);
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

  res.send(200);
};

exports.stop = function(req, res) {
  'use strict';
  
  if (isWorking) {
    clearInterval(repeatable);
    isWorking = false;
  }

  res.send(200);
};
