exports.index = function(req, res) {
  res.render('index', { title: "Revive",
		      text: "Welcome Express4" });
};
