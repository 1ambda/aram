var module = angular.module('ForceRevivalApp.directives', []);

module.directive('googleAreaChart', ['StatusFactory', function(StatusFactory) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function($scope, $element, $attrs) {
      
      StatusFactory.query({ site: $attrs.site }, function(result) {
	if (!result.length) {
	  return;
	}

	$element.addClass('google-chart');
	
	var googleChart = new google.visualization.AreaChart($element[0]);
	
	var rowData = [['Date',
			{type: 'string', role: 'tooltip', 'p' : {'html': true}},
			'Status']];
	
	for(var i = 0; i < result.length; i++) {
	  rowData.push([new Date(result[i].date),
			createCustomHTMLContent(result[i].imagePath,
					        new Date(result[i].date),
						result[i].serviceStatus),
		        (result[i].serviceStatus === 'alive') ? 1 : 0]);
	}
	
	var data = google.visualization.arrayToDataTable(rowData);
	
	var options = {
          title: $attrs.site,
          hAxis: {titleTextStyle: {color: '#333'}, format: 'H:mm'},
          vAxis: {minValue: 0,
		  ticks: [{v:0, f: "dead"}, {v:1, f: "alive"}, {v:1.25, f:""}]},
	  colors: [$attrs.color || 'red' ],
	  focusTarget: 'category',
	  tooltip: { isHtml: true }
	};

	googleChart.draw(data, options);
	
      });
    }
  };
}]);

function createCustomHTMLContent (imagePath, date, state) {
  'use strict';
  
  return '<div style="padding 5px; 5px; 5px; 5px;">' +
    '<img src="' + imagePath + '" style="width: 100px; height: 75px;"/>' +
    // '<p>Time: ' + (new Date(date)).toLocaleString() + '</p>' +
    '</div>';
}

