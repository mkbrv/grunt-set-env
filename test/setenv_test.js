'use strict';

var grunt = require('grunt');

exports.setenv = {
    setUp: function (done) {
        done();
    },
    setEnvTestFromConfig: function (test) {
        test.expect(1);
        test.equal(grunt.config.get("env"), "DEV");
        test.done();
    }

};
