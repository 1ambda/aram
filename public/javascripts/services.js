var service = angular.module('ForceRevivalApp.services', ['ngResource']);

service.factory('StatusFactory', function($resource) {
  'use strict';

  return $resource('/api/v1/image/:site', {
    site: '@site' 
  });
});

service.factory('StatusesFactory', function($resource) {
  'use strict';

  return $resource('/api/v1/images/', {});
});

