# ARAM

Action Runner and Monitor

<br>
### Guide

`ARAM` consists of two parts. `Runner` and `Monitor`

<br>
### Runner
`Runner` captures website and checks whether service is availale by finding DOM and if not `Runner` executes **actions** written in node.js.
<br>
<br>
**action** which is node.js script should be defined in **/runner/util/requirements.js** and exists in **/runner/actions/**
<br>
<br>
every **action** exports function takes at least 1 arguments which is `done` callback **must** be called in **action** for instance unless runner will be stop
<br>
```
module.exports = function(done, siteName) {
  var exec = require('child_process').exec;
  exec("node /home/auth/restart.js", function(err, stdout, stderr) {
  
    if (err) {
      console.log('err : ' + err);
    }

    console.log('\n\tAction Result : \n\n' + stdout + '\n');
    console.log((new Date()).toLocaleString() +
		': Done action for service [' + siteName + ']');
    done();
  });
};
```

<br>
### Monitor

`Monitor` is web-service which provides other website's status using charts and images recorded by `Runner`. 

<br>
### Todo

- Monitor diR structure
- action : nodemailer
- grunt build script [Use this](https://github.com/sindresorhus/grunt-shell)
- Grunt minify, uglify script and css
- less, grunt-contrib-less
- Logging with winston
- passport
- MongoDB virtual
- csurf

<br>
### Installation Guide

```
$ sudo npm install -g phantomjs
$ sudo npm install -g casperjs
$ sudo npm install -g supervisor

$ # git clone move to aram directory
$ git clone http://github.com/ansterd/aram
$ cd aram

/aram $ npm install
/aram $ bower install
/aram $ npm start
/aram $ cd runner
/aram/runner $ npm start
```

<br>
### Development Guide

```
npm install -g phantomjs
npm install -g casperjs
npm install -g mocha
npm install -g grunt-cli
npm install -g less
npm install -g supervisor
```

