'use strict';

var grunt = require('grunt');
var fs = require('fs');

function readFile(file) {
  return grunt.util.normalizelf(grunt.file.read(file));  
}

function assertFileEquality(test, pathToActual, pathToExpected, message) {
  var actual = readFile(pathToActual);
  var expected = readFile(pathToExpected);
  test.equal(expected, actual, message);
}

exports.lsc = {
  noOptions: function(test) {
    test.expect(2);

    assertFileEquality(test,
      'tmp/click.js',
      'test/expected/click.js',
      'Should compile LiveScript to JavaScript.');

    assertFileEquality(test,
      'tmp/compiledThenJoined.js',
      'test/expected/compiledThenJoined.js',
      'Should compile LiveScript files to JavaScript, then concatenate the results into one file.');

    test.done();
  },
  bare: function(test) {
    test.expect(2);

    assertFileEquality(test,
      'tmp/bareClick.js',
      'test/expected/bareClick.js',
      'Should compile LiveScript to JavaScript w/o a function wrapper.');

    assertFileEquality(test,
      'tmp/bareCompiledThenJoined.js',
      'test/expected/bareCompiledThenJoined.js',
      'Should compile LiveScript files to JavaScript, then concatenate the results into one file,' + 
      ' w/o a toplevel function wrapper.');

    test.done();
  },
  join: function(test) {
    test.expect(1);

    assertFileEquality(test,
      'tmp/joinedThenCompiled.js',
      'test/expected/joinedThenCompiled.js',
      'Should join LiveScript files together and then compile them to JavaScript.');

    test.done();
  },
  bareAndJoin: function(test) {
    test.expect(1);

    assertFileEquality(test,
      'tmp/bareJoinedThenCompiled.js',
      'test/expected/bareJoinedThenCompiled.js',
      'Should join LiveScript files together and then compile them to JavaScript, w/o a toplevel function wrapper.');

    test.done();
  },
};
