var should = require('should'),
    request = require('supertest'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../app/config/config')[env];

describe('Controller: image', function() {

  request = request('http://localhost:' + config.port);

  describe('GET /api/v1/images/:sitename', function() {
    it('should return json', function(done) {

      var sitename = 'accounts';
      request.
	get('/api/v1/images/' + sitename).
	expect('Content-Type', /json/).
	expect(200).
	end(function(err, res) {
	  if (err) {
	    should.fail(err);
	    done();
	  }
	  
	  done();
	});
    });
  });
});
