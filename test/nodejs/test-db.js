var should = require('should');

describe('Database Connection', function() {
  var env = [process.env.NODE_ENV || 'development'];
  var config = require('../../app/config/config')[env];
  
  describe('config', function() {
    it('should have property "db"', function() {
      (config).should.have.property('db');
    });
  });
});
