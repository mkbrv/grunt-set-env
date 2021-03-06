# grunt-set-env

> Allows you to define environment variables to be used in config of future grunt tasks in the chain. Variables can be a
JSON/String stored in external file, hard-coded or can be the result of a function.

## Getting Started
This plugin requires Grunt `~0.4.x`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-set-env --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-set-env');
```

## The "setenv" task

### Overview
In your project's Gruntfile, add a section named `setenv` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  setenv: {
    options: {
        envFolder: "config/env"
    },
    dev: {
        envTarget:"env"
    },
    prod:{
        env:{ root_folder : "production"}
    },
    test:{
        envKey:"test",
        env:function(){
            return "test"
        }
    }
  },
});
```

### Options

#### options.envFolder
Type: `String`
Default value: `'env'`

A string value that is used to determine the folder from where json configuration will be read from.

#### options.envTarget
Type: `String`
Default value: `'dev'`

A string value that is used to recognize the specific json config file which will be read

#### options.envKey
Type: `String`
Default value: `'env'`

A string value that is used as key for grunt.config. To recover the environment values <%=key.whatever%> or grunt.config.get("key");

#### options.env
Type: `String`,`Object`,`Function`
Default value: `'undefined'`

An environment variable which will be used instead of reading from a json. It can be the result of a function,
a String or an Object.

### Usage Examples

#### Default Options
In this example if you run `grunt setenv:dev` it will search for the dev.json file in config/env folder. If found
it will set in grunt.config the env key with the json object. Considering the json `{deploy_root:'path'}`
for all the tasks runned after setenv:dev

```js
grunt.initConfig({
  setenv: {
        options: {
            envFolder: "config/env"
        },
        dev:{
            envTarget:"dev.json" // this is also default
        }
  },
  someothertask:{
    options:{
         dest:"<%=env.deploy_root%>/",
         src: function(){
            var envObject = grunt.config.get("env");
         }
    }
  }
});
grunt.registerTask('build','setenv:dev','someothertask')
```

#### Custom Example
In this example, I am creating 3 environments.
- dev : will have json stored in the config/env/env.json
- prod: will have json hardcoded
- test: will have custom key: test and the environment variable from function

```js
grunt.initConfig({
  setenv: {
    options: {
        envFolder: "config/env"
    },
    dev: {
        envTarget:"env"
    },
    prod:{
        env:{ root_folder : "production"}
    },
    test:{
        envKey:"test",
        env:function(){
            return "test"
        }
    }
  },
});
```

In this example I will be able to deploy on different environments:
- grunt deploy:dev
- grunt deploy:testOne
- grunt deploy:testTwo

```js
module.exports = function (grunt) {
      grunt.initConfig({
                pkg: grunt.file.readJSON('package.json')
        });
            grunt.config('setenv', {
                dev: {
                    options: {
                        envFolder: "grunt-tasks/env"
                    }
                }
            });
    grunt.registerTask('deploy', function (env) {
        grunt.task.run([
            'setenv:' + env,
            "clean",
            'jshint',
            'copy:static',
            'less',
            'useminPrepare',
            'requirejs',
            'concat',
            'usemin',
            'processhtml',
            'uglify',
            'cssmin'
        ]);
    });
};
```
```js
 grunt.config('copy', {
            static: {
                files: [
                    {expand: true, cwd: 'src/', src: ['index.html'], dest: '<%=env.folder%>/'},
                    /*  boostrap fonts and images*/
                    {expand: true, cwd: 'src/static/vendor/bootstrap/fonts', src: ['**'], dest: '<%=env.folder%>/static/fonts'},
                /** img stuff */
                    {expand: true, cwd: 'src/static/img', src: ['**'], dest: '<%=env.folder%>/static/img'}
                ]
            }
    );
};
```

Example of environment config file: grunt-tasks/env/dev.json <br>
It can contain other variables as well. (eg: pkg)
```js
{
    "type": "deployment",
    "folder": "deploy/<%=pkg.name%>-<%=pkg.version%>"
}
```


## GitHub
[https://github.com/mikibrv/grunt-set-env](https://github.com/mikibrv/grunt-set-env)


## Release History
- 0.1.2 Initial release + readme changes

##Author
Miklos Csere