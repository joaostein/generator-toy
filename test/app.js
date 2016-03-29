'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var _ = require('lodash');

describe('toyproblem:app', function () {
  before(function (done) {
    this.answers = {
      name: 'exampleProject'
    };

    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts(this.answers)
      .on('end', done);
  });

  describe('defaults', function () {
    it('should CD into a folder named with kebab-case version of argument', function () {
      assert.equal(path.basename(process.cwd()), _.kebabCase(this.answers.name));
    });

    it('should create default files', function () {
      var expected = [
        'package.json',
        'README.md',
        'LICENSE.md',
        '.gitignore',
        'gulpfile.js',
        'index.js',
        'test/test.js'
      ];

      assert.file(expected);
    });
  });

  describe('package.json', function () {
    it('should fill with correct information', function () {
      assert.jsonFileContent('package.json', {
        name: _.kebabCase(this.answers.name)
      });
    });
  });
});
