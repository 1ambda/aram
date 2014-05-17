var mongoose = require('mongoose'),
    Status = mongoose.model('Status');



exports.getSiteStatusById = function(req, res) {
  'use strict';

  Status.find({}, function(err, results) {
    if(err) {
      console.log(err);
      res.send(503);
    }
    res.send(results);
    
  });
};
