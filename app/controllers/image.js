var mongoose = require('mongoose'),
    Status = mongoose.model('Status');

exports.getSiteStatusBySiteName = function(req, res) {
  'use strict';

  var maxDocSize = 20;

  Status.find({ siteName: req.params.site }).
    sort({ date: -1 }).
    limit(maxDocSize).
    exec(function(err, docs) {
      if (err) {
	console.log(err);
	res.send(503);
	return;
      }
      
      res.json(docs);
    });
};

exports.getSiteStatus = function(req, res) {
  'use strict';

  Status.find({}, function(err, results) {
    if (err) {
      console.log(err);
      res.send(503);
    }

    res.json(results);
  });
};
