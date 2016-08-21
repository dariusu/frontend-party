module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
         files: { 'js/general.min.js': ['src/_modules.js','src/buildmobile.js','src/general.js'] },
         options: {
             preserveComments: false
         }
       }
    },
    wiredep: {
      task: {
        src: ['index.html']
      }
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'src/_modules.js',
          'css': 'src/_modules.css'
        },
        exclude: [
          'grunt',
        ],
        dependencies: {
          'underscore': 'jquery'
        },
        bowerOptions: {
          relative: false
        },
        mainFiles: {
          'fancybox': ['source/jquery.fancybox.js','source/jquery.fancybox.css'],
          'jquery': ['dist/jquery.js'],
          'font-awesome': ['css/font-awesome.css'],
          'pure': ['pure.css','grids-responsive.css']
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },
    watch: {
       /* watch and see if our javascript files change, or new packages are installed */
       js: {
         files: ['src/*.js','bower_components/*'],
         tasks: ['bower_concat','uglify']
       },
       css: {
        files: 'src/*.css',
        tasks: ['autoprefixer','cssmin'],
        options: {
          livereload: true,
        },
      }
     },
     autoprefixer: {
      build: {
        expand: true,
        cwd: 'src',
        src: [ '*.css' ],
        dest: 'css'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path
          {expand: true, src: ['css/**'], dest: 'deploy'},
          {expand: true, src: ['fonts/**'], dest: 'deploy'},
          {expand: true, src: ['js/**'], dest: 'deploy'},
          {expand: true, src: ['*.html'], dest: 'deploy'},
        ],
      },
    },
    clean: {
      folder: ['js/','bower_components/','node_modules/','build/'],
      css: ['css/*.css'],
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'images/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'deploy/images'                  // Destination path prefix
        }]
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task(s).
  grunt.registerTask('default', ['watch','wiredep']);
  grunt.registerTask(
    'tempbuild',
    'Compiles all of the assets and copies the files to the build directory.',
    [ 'bower_concat', 'uglify','autoprefixer','cssmin' ]
  );
  grunt.registerTask(
    'build',
    'Builds clean HTML with compressed code and deploys to DEPLOY folder.',
    [ 'bower_concat', 'uglify','autoprefixer','cssmin','copy','imagemin']
  );
};
