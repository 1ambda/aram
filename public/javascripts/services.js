angular.module('ForceRevivalApp.services', ['ngResource']).
  factory('SpookyStart', function($resource) {
    'use strict';
    return $resource('/api/v1/spooky/start', {});
  }).
  factory('SpookyStop', function($resource) {
    'use strict';
    return $resource('/api/v1/spooky/stop', {});
  }).
  factory('Images', function($resource) {
    'use strict';
    return $resource('/api/v1/images/:site', {
      site: '@site'
    });
  });
  
