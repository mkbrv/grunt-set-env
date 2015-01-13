/*
 * grunt-set-env
 * https://github.com/mcsere/grunt-set-env
 *
 * Copyright (c) 2015 Miki
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function (grunt) {

    grunt.registerMultiTask('setenv', 'Environment variables to be used in grunt tasks config.', function (target) {
        // Merge task-specific options with these defaults.
        var options = this.options({
            envFolder: 'env',
            envTarget: 'dev',
            env: undefined
        });

        if (target === undefined) {
            target = options.envTarget;
        }
        var env;
        if (options.env === undefined) {
            var envFile = options.envFolder + "/" + target + ".json";
            if (!grunt.file.exists(envFile)) {
                grunt.log.error("Environment " + target + " not found. Please check folder: " + envFile);
                return true;//return false to abort the execution
            }
            env = grunt.file.readJSON(envFile);
        } else {
            if (isFunction(options.env)) {
                env = options.env();
            } else {
                env = options.env;
            }
        }
        grunt.config.set("env", env);
        grunt.log.writeln("Environment set: " + target);
        return true;
    });

};

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}