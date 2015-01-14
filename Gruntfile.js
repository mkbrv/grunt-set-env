/*
 * grunt-set-env
 * https://github.com/mikibrv/grunt-set-env
 *
 * Copyright (c) 2015 Miki
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        setenv: {
            options:{
                envFolder: "config/env"
            },
            dev: {
                options: {
                    envTarget: "dev.json"
                }
            }

        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');


    grunt.registerTask('test', ['setenv', 'nodeunit']);

};
