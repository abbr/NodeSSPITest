// Generated on 2013-12-04 using generator-angular-fullstack 1.0.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    express : {
      options : {
        port : process.env.PORT || 9000
      },
      dev : {
        options : {
          script : 'server.js',
          debug : true
        }
      },
      prod : {
        options : {
          script : 'server.js',
          node_env : 'production'
        }
      }
    },
    open : {
      server : {
        url : 'http://localhost:<%= express.options.port %>'
      }
    },
    watch : {
      express : {
        files : ['server.js', '{,node_modules/node-sspi/**/}*.{js,json}'],
        tasks : ['express:dev'],
        options : {
          livereload : true,
          nospawn : true
          // Without this option specified express won't be reloaded
        }
      },
      gruntfile : {
        files : ['Gruntfile.js']
      }
    }
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'express:prod', 'open', 'express-keepalive']);
    }
    grunt.task.run(['express:dev', 'open', 'watch']);
  });

  grunt.registerTask('default', ['serve']);
};
