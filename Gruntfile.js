/**
 * Created by bvolosincu on 5/12/2014.
 */
module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * copy and sync must be kept identical
         **/

        copy: {
            source: {
                files: [
                    {expand: true, src: ['./*.html'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./main/*.js'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./main/*/*.js'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./main/**/js/*.js'], dest: 'build/CoffeePubSub'}
                ]
            },
            libs: {
                files: [
                    {expand: true, src: ['./libs/requirejs/*.js', './libs/underscore/*.js'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./libs/jasmine/lib/jasmine-core/*.js', './libs/jasmine/lib/jasmine-core/*.css'], dest: 'build/CoffeePubSub/libs/jasmine', flatten: true},
                    {expand: true, src: ['./libs/jquery/dist/jquery.min.js'], dest: 'build/CoffeePubSub/libs/jquery', flatten: true}
                ]
            },
            dest: {
                files: [
                    {expand: true, src: ['./main/core/publisher.js'], dest: 'build/dest', flatten: true},
                    {expand: true, src: ['./main/src/publisher.coffee'], dest: 'build/dest', flatten: true}
                ]
            }

        },

        sync: {
            source: {
                files: [
                    {expand: true, src: ['./*.html'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./main/*.js'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./main/*/*.js'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./main/**/js/*.js'], dest: 'build/CoffeePubSub'}
                ],
                verbose: true
            },
            libs: {
                files: [
                    {expand: true, src: ['./libs/requirejs/*.js', './libs/underscore/*.js'], dest: 'build/CoffeePubSub'},
                    {expand: true, src: ['./libs/jasmine/lib/jasmine-core/*.js', './libs/jasmine/lib/jasmine-core/*.css'], dest: 'build/CoffeePubSub/libs/jasmine', flatten: true},
                    {expand: true, src: ['./libs/jquery/dist/jquery.min.js'], dest: 'build/CoffeePubSub/libs/jquery', flatten: true}
                ],
                verbose: true
            },
            dest: {
                files: [
                    {expand: true, src: ['./main/core/publisher.js'], dest: 'build/dest', flatten: true},
                    {expand: true, src: ['./main/src/publisher.coffee'], dest: 'build/dest', flatten: true}
                ]
            }
        },

        uglify: {
            minlib: {
                files: {
                    'build/dest/publisher.min.js': ['./main/core/publisher.js']
                }
            }
        }

    });



    grunt.loadNpmTasks('grunt-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('sync', ['sync:source', 'sync:libs']);
    grunt.registerTask('default', ['copy:source', 'copy:libs', 'copy:dest', 'uglify:minlib']);



};