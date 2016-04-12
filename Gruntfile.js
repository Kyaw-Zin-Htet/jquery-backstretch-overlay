/*global module:false*/
module.exports = function(grunt) {

  // configurable paths
  var paths = {
      source: 'src',
      dist: 'dist'
  };

  // Project configuration.
  grunt.initConfig({
    app: paths,
    _: require('underscore'),
    pkg: grunt.file.readJSON('package.json'),
    banner: "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today('yyyy-mm-dd') %> \n" +
    "* <%= pkg.homepage %> \n" +
    "* Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>; \n" +
    "* Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */ \n",
    concat: {
      dist: {
        options: {
          stripBanners: true,
          banner: '<%= banner %>'
        },
        src: ['<%= app.source %>/<%= pkg.name %>.js'],
        dest: '<%= app.dist %>/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: '<%= app.dist %>/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: [
            'http://localhost:8000/test/backstretch.html',
          ]
        }
      }
    },
    lint: {
      files: ['grunt.js', '../src/**/*.js', '../test/**/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        laxcomma: true,
        globals: {
          require: true,
          jQuery: true
        }
      },
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
    },
    uglify: {
      build: {
        options: {
          banner: "<%= banner %>",
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          },
          beautify: false,
          mangle: true,
          // sourceMap: 'quark.map'
          sourceMap: true,
          // sourceMapName: 'path/to/sourcemap.map'
      },
      files: {
        "<%= app.dist %>/<%= pkg.name %>.min.js": ['<%= app.source %>/<%= pkg.name %>.js']
      }
    }

    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // This plugin provides the "connect" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task.
  // grunt.registerTask('default', 'lint qunit concat min');
  grunt.registerTask('default', ['concat', 'uglify']);
  // A convenient task alias.
  grunt.registerTask('test', ['connect', 'qunit']);

};