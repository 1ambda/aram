var should = require('should');

describe('Database Connection', function() {
  var config = require('../config/config')[process.env.NODE_ENV];

  describe('config', function() {
    it('should have property "db"', function() {
      (config).should.have.property('db');
    });
  });
});
