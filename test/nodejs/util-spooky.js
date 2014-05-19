var should = require('should'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    env = 'test',
    config = require('../../app/config/config')[env];

describe('Util: spooky.js', function() {

  var worker = require('../../app/util/spooky');
  var Status = null;

  before(function() {
    mongoose.connect(config.db);
    require('../../app/models/status');
    Status = mongoose.model('Status');
  });

  beforeEach(function() {
    Status.collection.drop();
  });

  after(function() {
    Status.collection.drop();
    mongoose.disconnect();
  });
  
  describe('s run spooky script', function() {
    it('should make a new image and document', function(done) {
      this.timeout(10000);

      var callback = function() {

	// Enhancement required: remove dir contents is necessary

	var files = fs.readdirSync('./public/site-images/');
	files.length.should.be.above(0);

	Status.find({}, function(err, result) {
	  if(err) {
	    should.fail(err);
	    done();
	  }

	  result.should.have.length(1);
	  done();
	});
      };

      worker('accounts',
	     'https://accounts.openknowl.com/public',
	     './public/site-images/',
	     'site-images/',
	     'jpg',
	     'html',
	     '#info-welcometext',
	     callback
	    );
      });
  });
});
