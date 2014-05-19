
// Load npm modules
var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    env = 'test',
    config = require('../../app/config/config')[env];


// Start test
describe('Model : Status', function() {
  'use strict';

  var Status = null;

  before(function() {
    mongoose.connect(config.db);
    require('../../app/models/status');
    Status = mongoose.model('Status');
  });

  beforeEach(function() {
      Status.collection.drop();
  });

  describe('Adding a new status', function() {
    it('status.count() should return 1', function(done) {
      var status = new Status({
	siteName: 'accounts',
	url: 'http://accounts.openknowl.com',
	date: new Date(),
	imagePath: '/home/anster/Workspace/',
	serviceStatus: true
      });

      status.save(function(error) {
	if (error) {
	  should.throwError('failed to save status');
	  done();
	}
	
	Status.find({}, function(error, result) {
	  if (error) {
	    should.throwError('failed to retrieve Status');
	    done();
	  }

	  result.should.have.length(1);
	  done();
	});
      });
    });
  });

  describe('Adding two status', function() {
    it('should make a new document', function(done) {
      var status1 = new Status({
	siteName: 'accounts',
	url: 'http://accounts.openknowl.com',
	date: new Date(),
	imagePath: '/home/anster/Workspace/',
	serviceStatus: true
      });

      var status2 = new Status({
	siteName: 'accounts',
	url: 'http://accounts.openknowl.com',
	date: new Date(),
	imagePath: '/home/anster/Workspace/',
	serviceStatus: true
      });

      status1.save(function(err) {
	if (err) {
	  should.fail(err);
	}

	status2.save(function(err) {
	  if (err) {
	    should.throwError(err);
	  }

	  Status.find({}, function(err, result) {
	    if (err) {
	      should.fail(err);
	    }

	    result.should.have.length(2);
	    done();
	  });
	});
      });

    });
  });

  after(function() {
    mongoose.disconnect();
  });


});
