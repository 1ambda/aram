module.exports = function(done) {
  'use strict';
  
  var spawn = require('child_process').spawn;
  var child = spawn('su', ['-l knowlauth -c ../forever_start.sh']);

  child.stdout.on('data', function(chunk) {

    var str = chunk.toString();
    var lines =  str.split(/(\r?\n)/g);

    for(var i = 0; i < lines.length; i++) {
      process.stdout.write(lines[i]);
    }
  });

  child.on('exit', function() {
    if (done) {
      done();
    }
  });
};
