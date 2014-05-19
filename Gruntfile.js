module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      javascript: {
	files: {
	  src: ['public/javascripts/**/*.js']
	},
	options: {
	  camelcase: true,
	  curly: true,
	  eqeqeq: true,
	  indent: 2,
	  newcap: true,
	  nonew: true,
	  undef: true,
	  unused: true,
	  strict: true,
	  evil: true,
	  laxcomma: true,

	  // Environments
	  browser: true,
	  devel: true,
	  jquery: true,
	  node: false,
	  globals: {
	    angular: true
	  }
	  
	}
      },
      nodejs: {
	options: {
	  camelcase: true,
	  curly: true,
	  eqeqeq: true,
	  indent: 2,
	  newcap: true,
	  nonew: true,
	  undef: true,
	  unused: true,
	  strict: true,
	  evil: true,
	  laxcomma: true,

	  // Environments
	  browser: true,
	  devel: true,
	  node: true,
	  jquery: false
	},
	files: {
	  src: ['app/**/*.js']
	}
	
      }
    },
    
    htmlhint: {
      html: {
	options: {
	  'tag-pair': true,
	  'tag-self-close': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'id-unique': true,
          'head-script-disabled': true,

	  // Specification
          'style-disabled': true,
	  'doctype-html5': true
	},

	src: ['app/views/*.html']
      }
    },

    csslint: {
      strict: {
	options: {
	  import: 2
	},
	src: ['public/stylesheets/**/*.css']
      },
      lax: {
	options: {
	  import: false,
	  "adjoining-classes": false
	},
	src: ['public/stylesheets/**/*.css']
      }
    },

    watch: {
      options: {
	livereload: true
      },

      javascriptTest: {
	files: ['public/javascripts/**/*.js',
		'test/javascript/**/test-*.js'],
	tasks: ['mochaTest:javascript'],
	options: {
	  livereload: false,
	  spwan: true
	}
      },
      
      javascript: {
	files: ['public/javascripts/**/*.js'],
	tasks: ['jshint:javascript', 'mochaTest:javascript']
      },

      css: {
	files: ['public/stylesheets/**/*.css'],
	tasks: ['csslint:lax']
      },

      html: {
	files: ['app/views/**/*.html'],
	tasks: ['htmlhint']
      },

      nodejs: {
	files: ['app/**/*.js', 'server.js'],
	tasks: ['jshint:nodejs', 'express:dev'],
	options: {
	  spawn: false,
	  livereload: false
	}
      },

      nodejsTest: {
	files: ['app/**/*.js', 'server.js', 'test/nodejs/**/test-*.js'],
	tasks: ['mochaTest:nodejs'],
	options: {
	  spawn: true,
	  livereload: false
	}
      },

      // nodejsApiTest: {
      // 	files: ['app/controllers/**/*.js', 'app/router.js',
      // 	        'test/nodejs/**/api-*.js'],
      // 	tasks: ['mochaTest:nodejsApiTest'],
      // 	options: {
      // 	  spawn: true,
      // 	  livereload: false
      // 	}
      // },

      configFiles: {
	files: [ 'Gruntfile.js' ],
	options: {
	  reload: true,
	  livereload: false

	}
      }
    },

    express: {
      options: {
	node_env: 'development'
      },
      dev: {
	options: {
	  script: 'server.js'
	}
      }
    },

    mochaTest: {
      javascript: {
	options: {
	  reporter: 'spec'
	},
	src: ['test/javascript/**/test-*.js']
      },

      nodejs: {
	options: {
	  reporter: 'spec'
	},
	src: ['test/nodejs/**/test-*.js']
      },

      nodejsApiTest: {
	options: {
	  reporter: 'spec'
	},
	src: ['test/nodejs/**/api-*.js']
      }
    }
    
  });

  // Automatically load grunt-contrib modules defined in package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('lint', ['jshint', 'htmlhint', 'csslint:lax']);
  grunt.registerTask('test', ['mochaTest:javascript',
			      'mochaTest:nodejs']);
  grunt.registerTask('api-test', ['mochaTest:nodejsApiTest']);
  grunt.registerTask('server', ['test', 'express:dev', 'watch']);
};
