// Karma configuration
// Generated on Tue May 20 2014 17:56:47 GMT+0900 (KST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],


    // list of files / patterns to load in the browser
    files: [
      // depenedencies
      'public/bower_components/jquery/dist/jquery.min.js',
      'public/bower_components/underscore/underscore.js',
      'public/bower_components/angular/angular.min.js',
      'public/bower_components/angular-resource/angular-resource.min.js',
      'public/bower_components/angular-route/angular-route.min.js',

      // test dependencies
      'public/bower_components/angular-mocks/angular-mocks.js',
      'public/bower_components/chai/chai.js',
      
      // tests
      'public/test/**/*.js',

      // application
      'public/javascripts/**/*.js'
    ],


    // list of files to exclude
    exclude: [
      
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};