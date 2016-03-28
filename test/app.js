'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var _ = require('lodash');

describe('toyproblem:app', function () {
  var FOLDER_NAME = 'example-folder';

  describe('defaults', function () {
    before(function (done) {
      var generatorPath = path.join(__dirname, '../generators/app');
      helpers.run(generatorPath)
        .withArguments([FOLDER_NAME])
        .on('end', done);
    });

    it('should CD into a folder named with camelCase version of argument', function () {
      assert.equal(path.basename(process.cwd()), _.camelCase(FOLDER_NAME));
    });

    it('should create default files', function () {
      var expected = [
        'package.json',
        'README.md'
      ];

      assert.file(expected);
    });
  });
});
