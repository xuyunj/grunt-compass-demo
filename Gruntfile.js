/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      // Metadata.
      meta: {
        basePath: './',
        srcPath: './sass/',
        deployPath: './dist/css/'
      },
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

      // Task configuration.
      connect:{
        options: {
          port: 9000,
          hostname: '*', 
          livereload: 35729  
        },
        server: {
          options: {
            open: true,
            base: [ '.' ]
          }
        }
         
      },
  
      sass: {
          dist: {
              files: {
                  '<%= meta.deployPath %>screen.css': '<%= meta.srcPath %>screen.scss'
              }
          }
      },
    
      compass: {
        dist: {
          options: {
            config: './config.rb', 
          }
        }
      },
  
      watch: {
        scripts: {
            files: [
                '<%= meta.srcPath %>/**/*.scss'
            ],
            tasks: ['compass']
        },
        livereload: {
          options: {
            livereload:'<%=connect.options.livereload%>' 
          },
          files:[ 
           '*.html',
           '<%= meta.deployPath %>screen.css'
          ]
        }
      }
    });
  
    // These plugins provide necessary tasks.
    //grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
  
    // Default task.
    grunt.registerTask('default', ['compass','connect','watch']);
    
  };
  
  