exports.index = function(req, res) {
  'use strict';
  res.render('index', { title: "Revive",
		      text: "Welcome Express4" });
};
