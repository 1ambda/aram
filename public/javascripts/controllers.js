angular.module('ForceRevivalApp.controllers', []).
  controller('MainCtrl', [
    '$scope',
    'StatusFactory',
    'StatusesFactory',
    mainCtrl
  ]);


function mainCtrl($scope, StatusFactory, StatusesFactory) {
  'use strict';

  google.setOnLoadCallback(drawChart);

  function drawChart () {

    StatusesFactory.query({}, function(result) {

      if (!result.length) {
	return;
      }
      
      var container = document.getElementById('example1');
      var chart = new google.visualization.AreaChart(container);
      // var dataTable = new google.visualization.DataTable();
      // dataTable.addColumn({ type: 'string', id: 'year' });
      // dataTable.addColumn({ type: 'number', id: 'Sales' });
      // dataTable.addColumn({ type: 'number', id: 'Expanses' });

      // dataTable.addRows([
      // 	['Year', 'Sales', 'Expenses'],
      //   ['2013',  1000,      400],
      //   ['2014',  1170,      460],
      //   ['2015',  660,       1120],
      //   ['2016',  1030,      540]
      // ]);

      var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2013',  1000,      400],
          ['2014',  1170,      460],
          ['2015',  660,       1120],
          ['2016',  1030,      540]
        ]);

      // for(var i = 0; i < result.length - 1; i++) {
      // 	console.log(result[i].serviceStatus.toString());
      // 	dataTable.addRows([
      // 	  [result[i].siteName,
      // 	   result[i].serviceStatus,
      // 	   new Date(result[i].date),
      // 	   new Date(result[i+1].date)
      // 	  ]
      // 	]);
      // }

      var options = {
        title: 'Company Performance',
        hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
        vAxis: {minValue: 0}
      };

      chart.draw(data, options);
    });
  }
}
