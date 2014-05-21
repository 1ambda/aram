var module = angular.module('ForceRevivalApp.directives', []);


// <div google-area-chart site="accounts" color="red">
module.directive('googleAreaChart', ['StatusFactory', function(StatusFactory) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      $element.addClass('google-chart');
      
      StatusFactory.query({ site: $attrs.site }, function(result) {
	// if (!result.length) {
	//   return;
	// }

	// TODO: use backend data
	  
	var googleChart = new google.visualization.AreaChart($element[0]);
	
	var data = google.visualization.arrayToDataTable([
          ['Date', 'Status'],
          [new Date('2014-05-19'), 1],
          [new Date('2014-05-20'), 0],
          [new Date('2014-05-21'), 1],
          [new Date('2014-05-22'), 1],
          [new Date('2014-05-23'), 1],
          [new Date('2014-05-24'), 0],
          [new Date('2014-05-25'), 1],
          [new Date('2014-05-26'), 1],
          [new Date('2014-05-27'), 1],
          [new Date('2014-05-28'), 1],
          [new Date('2014-05-29'), 1],
          [new Date('2014-05-30'), 1],
          [new Date('2014-05-31'), 1],
          [new Date('2014-06-01'), 1],
          [new Date('2014-06-02'), 1],
          [new Date('2014-06-03'), 1],
          [new Date('2014-06-04'), 1],
          [new Date('2014-06-05'), 1]
	]);
	
	var options = {
          title: $attrs.site,
          hAxis: {titleTextStyle: {color: '#333'}, format: 'H:mm'},
          vAxis: {minValue: 0,
		  ticks: [{v:0, f: "dead"}, {v:1, f: "alive"}, {v:1.25, f:""}]},
	  colors: [$attrs.color || 'red' ]
	};

	googleChart.draw(data, options);
	
      });
    }
  };
}]);
