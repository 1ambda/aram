angular.module('ForceRevivalApp.controllers', []).
  controller('MainCtrl', [
    '$scope',
    'SpookyStart',
    'SpookyStop',
    mainCtrl
  ]);

function mainCtrl($scope, SpookyStart, SpookyStop) {
  'use strict';

  $scope.text = 'Welcome AngularJS';
  
  $scope.startSpooky = function() {
    SpookyStart.get(function() {
    });
  };

  $scope.stopSpooky = function() {
    SpookyStop.get(function() {
      
    });
  };
}
