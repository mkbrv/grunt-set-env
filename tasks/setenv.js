/*
 * grunt-set-env
 * https://github.com/mikibrv/grunt-set-env
 *
 * Copyright (c) 2015 Miki
 * Licensed under the MIT license.
 */

'use strict';


module.exports = function (grunt) {

    var defaultOptions = {
        envFolder: 'env', //folder where to look for the environments
        envTarget: 'dev.json', // file name where config can be found. Default: Will search for target.json
        envKey: 'env', //key to be used in grunt.config
        env: undefined // environment variable in case you wish to hard-code-it or have it as a function result
    };

    grunt.registerMultiTask('setenv', 'Environment variables to be used in grunt tasks config.', function () {
        // Merge task-specific options with these defaults.
        var options = this.options(defaultOptions);

        var target = this.target;
        var env;
        if (options.env === undefined) { //if env is hardcoded.. let it be
            if (options.envTarget !== defaultOptions.envTarget) {
                target = options.envTarget;
            }
            if (target.indexOf(".") === -1) {
                target = target + ".json";
            }
            var envFile = options.envFolder + "/" + target;
            if (!grunt.file.exists(envFile)) {
                grunt.log.error("Environment " + target + " not found. Please check folder: " + envFile);
                return false;//return false to abort the execution
            }
            env = grunt.file.readJSON(envFile);
        } else {
            if (isFunction(options.env)) {
                env = options.env();
            } else {
                env = options.env;
            }
        }
        grunt.config.set(options.envKey, env);
        grunt.log.writeln("Environment set: " + target);
        return true;
    });

};

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}