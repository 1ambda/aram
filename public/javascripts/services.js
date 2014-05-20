var service = angular.module('ForceRevivalApp.services', ['ngResource']);

service.factory('SpookyStart', function($resource) {
  'use strict';
  
  return $resource('/api/v1/spooky/start', {});
});

service.factory('SpookyStop', function($resource) {
  'use strict';
  
  return $resource('/api/v1/spooky/stop', {});
});

service.factory('ImageFactory', function($resource) {
  'use strict';

  return $resource('/api/v1/images/:site', {
    site: '@site' 
  });
});

service.factory('MathService', function() {
  'use strict';
  
  return {
    sum: function(a, b) {
      return a + b;
    }
  };
});

