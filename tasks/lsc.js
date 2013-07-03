/*
 * grunt-lsc
 * https://github.com/gwwfps/grunt-lsc
 *
 * Copyright (c) 2013 David Zhang
 * Licensed under the MIT license.
 */


module.exports = function(grunt) {
  'use strict';

  var path = require('path');
  var _ = grunt.util._;

  grunt.registerMultiTask('lsc', 'Compile LiveScript file(s).', function() {
    var options = this.options({
      bare: false,
      join: false
    });

    grunt.verbose.writeflags(options, 'Options');    

    this.files.forEach(_.partial(processFileGroup, options));
  });

  var processFileGroup = function(options, fileGroup) {
    var files = fileGroup.src.filter(function(file) {
      if (grunt.file.exists(file)) {
        return true;
      } else {
        grunt.log.warn('Cannot find file: ' + file);
        return false;
      }            
    });
    
    var compile = options.join === true ? joinThenCompile : compileThenJoin;    
    writeFile(fileGroup.dest, compile(files, options));
  };

  var toCompilerOptions = function(options) {
    return {
      bare: options.bare
    };
  };

  var joinThenCompile = function (files, options) {
    var src = files.map(grunt.file.read).join(grunt.util.linefeed);
    return compileLs(src, options);
  };

  var compileThenJoin = function(files, options) {
    return files.map(function(filepath) {
      var code = grunt.file.read(filepath);
      return compileLs(code, options, filepath);
    }).join(grunt.util.linefeed);
  };

  var writeFile = function (path, output) {    
    if (output.length < 1) {
      grunt.log.warn('Destination (' + path + ') not written because compiled files were empty.');
    } else {      
      grunt.file.write(path, output);
      grunt.log.writeln('File ' + path + ' created.');
    }
  };

  var compileLs = function(code, options, filepath) {
    options = toCompilerOptions(options);
    if (filepath) {
      options.filename = filepath;
    }

    try {      
      return require('LiveScript').compile(code, options);    
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('Failed to compile LiveScript.');
    }
  };

};
