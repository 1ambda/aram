
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

  after(function() {
    Status.collection.drop();
    mongoose.disconnect();
  });

});
