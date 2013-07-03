# grunt-lsc

> Grunt plugin for compiling LiveScript files.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lsc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lsc');
```

## The "lsc" task

### Overview
In your project's Gruntfile, add a section named `lsc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  lsc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.bare
Type: `Boolean`
Default value: `false`

Disables toplevel function wrappers in the compiled JavaScript if this option is set to true.

#### options.join
Type: `Boolean`
Default value: `false`

A true value means the LiveScript source files will first be concatenated into one before being fed to the compiler,
whereas the default behavior is to compile each file separately and join the results into one file at the end.

### Usage Examples



```js
grunt.initConfig({
  lsc: {
    noOptions: {
      files: {
        'tmp/click.js': ['test/fixtures/click.ls'],
        'tmp/compiledThenJoined.js': ['test/fixtures/take.ls', 'test/fixtures/click.ls']
      }
    },
    bare: {
      options: {
        bare: true
      },
      files: {
        'tmp/bareClick.js': ['test/fixtures/click.ls'],
        'tmp/bareCompiledThenJoined.js': ['test/fixtures/take.ls', 'test/fixtures/click.ls']
      }
    },
    join: {
      options: {
        join: true
      },
      files: {
        'tmp/joinedThenCompiled.js': ['test/fixtures/take.ls', 'test/fixtures/click.ls']
      }
    },
    bareAndJoin: {
      options: {
        bare: true,
        join: true
      },
      files: {
        'tmp/bareJoinedThenCompiled.js': ['test/fixtures/take.ls', 'test/fixtures/click.ls']
      }
    },
  },
})
```

## Release History
- 1.0 - Initial release.
