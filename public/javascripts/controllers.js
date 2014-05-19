angular.module('ForceRevivalApp.controllers', []).
  controller('MainCtrl', [
    '$scope',
    'SpookyStart',
    'SpookyStop',
    mainCtrl
  ]);

function mainCtrl($scope, SpookyStart, SpookyStop, Images) {
  'use strict';

  $scope.text = 'Welcome AngularJS';

  // TODO: Consume Image API
  $scope.startSpooky = function() {
    SpookyStart.get(function() {
    });
  };

  $scope.stopSpooky = function() {
    SpookyStop.get(function() {
    });
  };
}
