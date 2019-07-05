module.exports = function (grunt) {
    // grunt.file.defaultEncoding='utf8';
    // grunt.file.preserveBOM = true;

// -- Config -------------------------------------------------------------------

grunt.initConfig({

    nick : 'pure',
    pkg  : grunt.file.readJSON('package.json'),
    bower: grunt.file.readJSON('bower.json'),

    // -- bower.json Config ---------------------------------------------------------

    bower_json: {
        release: {
            values: {
                main: 'pure.css'
            },

            dest: 'build/'
        }
    },

    // -- Clean Config ---------------------------------------------------------

    clean: {
        build    : ['build/'],
        build_res: ['build/*-r.css'],
        mm    : ['src/mm/'],
        release  : ['release/<%= pkg.version %>/']
    },

    // -- Copy Config ----------------------------------------------------------

    copy: {
        build: {
            src    : 'src/**/css/*.css',
            dest   : 'build/',
            expand : true,
            flatten: true
        },

        release: {
            src : '{LICENSE.md,README.md,HISTORY.md}',
            dest: 'build/'
        },
        js:{
            src    : 'dist/*.min.js',
            dest   : 'D:/mywork/yueliang/static/js/',
            expand : true,
            flatten: true
        },
        css:{
            src    : 'build/pure-min.css',
            dest   : 'D:/mywork/yueliang/static/css/',
            expand : true,
            flatten: true
        },
        css_mm: {
            src    : 'src/mm/*.css',
            dest   : 'build/',
            expand : true,
            flatten: true
        },

        css_from_yl:{
            src    : ['D:/mywork/yueliang/static/css/article/*.css','D:/mywork/yueliang/static/css/common/*.css'],
            dest   : 'src/mm/',
            expand : true,
            flatten: true
        },
        css_to_yl:{
            src    : 'build/mm-min.css',
            dest   : 'D:/mywork/yueliang/static/css/',
            expand : true,
            flatten: true
        },
    },

    // -- Concat Config --------------------------------------------------------

    concat: {
        build: {
            files: [
                {'build/base.css': [
                    'build/normalize.css',
                    'build/base.css'
                ]},

                {'build/buttons.css': [
                    'build/buttons-core.css',
                    'build/buttons.css'
                ]},

                {'build/forms-nr.css': [
                    'build/forms.css'
                ]},

                {'build/forms.css': [
                    'build/forms-nr.css',
                    'build/forms-r.css'
                ]},

                {'build/grids.css': [
                    'build/grids-core.css',
                    'build/grids-units.css'
                ]},

                {'build/menus.css': [
                    'build/menus-core.css',
                    'build/menus-horizontal.css',
                    'build/menus-dropdown.css',
                    'build/menus-scrollable.css',
                    'build/menus-skin.css',
                ]},

                // Rollups

                {'build/<%= nick %>.css': [
                    'simple/css/bootstrap_simple_util.css',
                    'build/base.css',
                    'build/grids.css',
                    'build/buttons.css',
                    'build/forms.css',
                    'build/menus.css',
                    'build/tables.css',
                    'simple/css/bootstrap_simple_modal.css',
                ]},
                {'build/mm.css': [
                    'simple/css/bootstrap_simple_util.css',
                    'build/base.css',
                    'build/grids.css',
                    'build/buttons.css',
                    'build/forms.css',
                    'build/menus.css',
                    'build/tables.css',
                    'simple/css/bootstrap_simple_modal.css',
                ]},


                {'build/<%= nick %>-nr.css': [
                    'build/base.css',
                    'build/grids.css',
                    'build/buttons.css',
                    'build/forms-nr.css',
                    'build/menus.css',
                    'build/tables.css'
                ]}
            ]
        },
        css_yl:{
            files: [
                {'build/mm.css': [
                    'build/ylcommon.css',
                    'build/common.css',
                    'build/act.css',
                    'build/goodslist.css'
                ]}]
        },
        js: {
          options: {
            separator: ''
          },
          src: [
            'src/js/util.js',
            'src/js/side.js',
            'src/js/gallery.js',
            'src/js/autocomplete.js',
            'src/js/scroll_loading.js',
            'simple/js/*.js'
             ],
          dest: 'dist/pure.js'
        },
    },

    // -- PostCSS Config --------------------------------------------------------

    postcss: {
        options: {
            processors: [
                require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 8', 'iOS >= 6', 'Android >= 4']})
            ]
        },
        dist: {
            src: 'build/*.css'
        }
    },

    // -- CSSLint Config -------------------------------------------------------

    csslint: {
        options: {
            csslintrc: '.csslintrc'
        },

        base   : ['src/base/css/*.css'],
        buttons: ['src/buttons/css/*.css'],
        forms  : ['src/forms/css/*.css'],
        grids  : ['src/grids/css/*.css'],
        menus  : ['src/menus/css/*.css'],
        tables : ['src/tables/css/*.css']
    },

    // -- CSSMin Config --------------------------------------------------------

    cssmin: {
        options: {
            noAdvanced: true
        },

        files: {
            expand: true,
            src   : 'build/*.css',
            ext   : '-min.css'
        }
    },

    // -- Compress Config ------------------------------------------------------

    compress: {
        release: {
            options: {
                archive: 'release/<%= pkg.version %>/<%= nick %>-<%= pkg.version %>.tar.gz'
            },

            expand : true,
            flatten: true,
            src    : 'build/*',
            dest   : '<%= nick %>/<%= pkg.version %>/'
        }
    },

    // -- License Config -------------------------------------------------------

    license: {
        normalize: {
            options: {
                banner: [
                    '/*!',
                    'normalize.css v<%= bower.devDependencies["normalize-css"] %> | MIT License | git.io/normalize',
                    'Copyright (c) Nicolas Gallagher and Jonathan Neal',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            cwd   : 'build/',
            src   : ['base*.css', '<%= nick %>*.css']
        },

        yahoo: {
            options: {
                banner: [
                    '/*!',
                    'Pure v<%= pkg.version %>',
                    'Copyright 2013 Yahoo!',
                    'Licensed under the BSD License.',
                    'https://github.com/pure-css/pure/blob/master/LICENSE.md',
                    '*/\n'
                ].join('\n')
            },

            expand: true,
            src   : ['build/*.css']
        }
    },

    // -- Pure Grids Units Config ----------------------------------------------

    pure_grids: {
        default_units: {
            dest: 'build/grids-units.css',

            options: {
                units: [3]
            }
        },

        responsive: {
            dest: 'build/grids-responsive.css',

            options: {
                units: 3,
                mediaQueries: {
                    sm: 'screen and (min-width: 35.5em)',   // 568px
                    md: 'screen and (min-width: 48em)',     // 768px
                    lg: 'screen and (min-width: 64em)',     // 1024px
                    xl: 'screen and (min-width: 80em)'      // 1280px
                }
            }
        }
    },

    // -- Strip Media Queries Config -------------------------------------------

    stripmq: {
        all: {
            files: {
                //follows the pattern 'destination': ['source']
                'build/grids-responsive-old-ie.css':
                    ['build/grids-responsive.css']
            }
        }
    },

    // -- CSS Selectors Config -------------------------------------------------

    css_selectors: {
        base: {
            src : 'build/base.css',
            dest: 'build/base-context.css',

            options: {
                mutations: [{prefix: '.pure'}]
            }
        }
    },

    // -- Watch/Observe Config -------------------------------------------------

    observe: {
        src: {
            files: 'src/**/css/*.css',
            tasks: ['test', 'suppress', 'build'],

            options: {
                interrupt: true
            }
        }
    },
    // -- js----
    jshint: {
      default: {
        src: [ 'src/js/*.js', 'simple/js/*.js']
      }
    },
    uglify: {
      options: {
        banner: ''
      },
      dist: {
        files: {
          'dist/pure.min.js': ['dist/pure.js']
        }
      }
    }
});

// -- Main Tasks ---------------------------------------------------------------

// npm tasks.
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-compress');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-css-selectors');
grunt.loadNpmTasks('grunt-postcss');
grunt.loadNpmTasks('grunt-pure-grids');
grunt.loadNpmTasks('grunt-stripmq');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');

// Local tasks.
grunt.loadTasks('tasks/');

grunt.registerTask('default', ['import', 'test', 'build']);
grunt.registerTask('import', ['bower_install']);
grunt.registerTask('test', ['csslint']);
grunt.registerTask('build', [
    'clean:build',
    'copy:build',
    'pure_grids',
    'stripmq',
    'concat:build',
    'clean:build_res',
    'css_selectors:base',
    'postcss',
    'cssmin',
    'license'
]);

// Makes the `watch` task run a build first.
grunt.renameTask('watch', 'observe');
grunt.registerTask('watch', ['default', 'observe']);
grunt.registerTask('js', ['concat:js','uglify','copy:js']);
grunt.registerTask('cssyl', ['clean:build','clean:mm','copy:css_from_yl','copy:css_mm','concat:css_yl','postcss','cssmin','copy:css_to_yl']);

grunt.registerTask('release', [
    'default',
    'clean:release',
    'copy:release',
    'bower_json:release',
    'compress:release'
]);

};
