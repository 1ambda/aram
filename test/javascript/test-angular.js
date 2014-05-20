

describe('Services', function() {
  'use strict';

  chai.should();
  

  beforeEach(module('ForceRevivalApp'));

  describe('MathService', function() {
    it('sum(2, 4) should be 6', inject(function(MathService) {
      MathService.sum(2, 4).should.be.equal(6);
    }));
  });
});
