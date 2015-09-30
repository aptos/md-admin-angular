module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      connect: {
        server: {
          port: 8000,
                // livereload: true,
                base: '../'
              }
            },
            less: {
              development: {
                options: {
                  paths: ["css"]
                },
                files: {
                  "css/app.css": "less/app.less",
                },
                cleancss: true
              }
            },
            sass: {
              dist: {
                files: [{
                  expand: true,
                  cwd: 'sass',
                  src: ['*.scss'],
                  dest: 'css',
                  ext: '.css'
                }]
              }
            },
            csssplit: {
              your_target: {
                src: ['css/app.css'],
                dest: 'css/app.min.css',
                options: {
                  maxSelectors: 4095,
                  suffix: '.'
                }
              },
            },
            ngtemplates: {
              materialAdmin: {
                src: ['template/**.html', 'template/**/**.html'],
                dest: 'js/templates.js',
                options: {
                  htmlmin: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true
                  }
                }
              }
            },
            watch: {
              styles: {
                files: ['less/**/*.less'], // which files to watch
                // tasks: ['less', 'csssplit'],
                tasks: ['less'],
                options: {
                  nospawn: true
                }
              },
              templates: {
                files: ['**/*.html'], // which files to watch
                tasks: ['ngtemplates'],
                options: {
                  nospawn: true
                }
              }
            }
          });

    // Load the plugin that provides the "less" task.
    grunt.loadNpmTasks('grunt-contrib-less');

    // We prefer sass
    grunt.loadNpmTasks('grunt-contrib-sass');

    // grunt.loadNpmTasks('grunt-csssplit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-connect');

    // Default task(s).
    grunt.registerTask('default', ['less', 'ngtemplates', 'connect:server', 'watch']);
    grunt.registerTask('styles', ['sass']);
  };
