var mongoose = require('mongoose'),
    Status = mongoose.model('Status');

exports.getSiteStatusBySiteName = function(req, res) {
  'use strict';

  Status.find({ siteName: req.params.site }, function(err, results) {
    if(err) {
      console.log(err);
      res.send(503);
    }

    res.json(results);
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
