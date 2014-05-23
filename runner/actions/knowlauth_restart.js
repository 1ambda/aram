module.exports = function(done, siteName) {
  var exec = require('child_process').exec;
  exec("node /home/knowlauth/restart.js", function(err, stdout, stderr) {
  
    if (err) {
      console.log('err : ' + err);
    }

    console.log('\n\tAction Result : \n\n' + stdout + '\n');
    console.log((new Date()).toLocaleString() +
		': Done action for service [' + siteName + ']');
    done();
  });
};
