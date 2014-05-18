
// Load npm modules
var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    env = 'test',
    config = require('../../app/config/config')[env];

// Bootstrap and load model
require('../../app/models/status');

// Start test
describe('Model : Status', function() {
  'use strict';

  var Status = null;

  before(function() {
    mongoose.connect(config.db);
    Status = mongoose.model('Status');
  });

  beforeEach(function() {
  });

  describe('Adding a new status', function() {
    it('status.count() return 0', function(done) {
      Status.collection.drop();
      should(Status.collection.count()).equal(0);
    });
  });

  after(function() {
    mongoose.disconnect();
  });

});
