module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      allWithDefaultOptions: ['public/javascripts/**/*.js'],
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
	node: false
	
      },
      nodehint: {
	options: {
	  node: true,
	  jquery: false
	},
	files: {
	  src: ['app/**/*.js']
	}
      }
    },
    
    htmlhint: {
      build: {
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

    watch: {
      javascript: {
	files: ['public/javascripts/**/*.js', 'app/**/*.js'],
	tasks: ['jshint'],
	options: {
	  spawn: false
	}
      },

      html: {
	files: ['app/views/**/*.html'],
	tasks: ['htmlhint'],
	options: {
	  spawn: false
	}
      },

      configFiles: {
	files: [ 'Gruntfile.js' ],
	options: {
	  reload: true
	}
      }
    }
    
  });

  // Automatically load grunt-contrib modules defined in package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('lint', ['jshint', 'htmlhint']);
  grunt.registerTask('default', ['watch']);
};
