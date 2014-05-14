var worker = require('../../util/accounts');
var site = "https://accounts.openknowl.com/public";
var second = 1000;
var repeatable;
var isWorking = false;

exports.start = function(req, res) {
  if (!isWorking) {
    repeatable = setInterval(worker, second * 60);
    isWorking = true;
  }

  res.send(200);
};

exports.stop = function(req, res) {
  if (isWorking) {
    clearInterval(repeatable);
    isWorking = false;
  }

  res.send(200);
};
