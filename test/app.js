'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var _ = require('lodash');

describe('toyproblem:app', function () {
  before(function (done) {
    this.answers = {
      name: 'exampleProject',
      version: '1.0.0',
      description: 'This is my example description',
      authorName: 'Testing',
      authorEmail: 'test@example.com',
      authorUrl: 'http://example.com'
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
        'LICENSE',
        '.gitignore',
        'gulpfile.js',
        'index.js',
        'test/test.js'
      ];

      assert.file(expected);
    });

    it('should include updated and named license file', function () {
      var year = (new Date()).getFullYear();
      assert.fileContent('LICENSE', 'Copyright (c) ' + year + ' ' + this.answers.authorName);
    });
  });

  describe('package.json', function () {
    it('should fill with correct information', function () {
      assert.jsonFileContent('package.json', {
        name: _.kebabCase(this.answers.name),
        version: this.answers.version,
        description: this.answers.description,
        main: 'index.js',
        scripts: {
          test: 'mocha'
        },
        license: 'MIT',
        author: {
          name: this.answers.authorName,
          email: this.answers.authorEmail,
          url: this.answers.authorUrl
        }
      });
    });

    it('should have dependencies', function () {
      assert.jsonFileContent('package.json', {
        devDependencies: {
          gulp: '*',
          chai: '*',
          mocha: '*',
          'gulp-eslint': '*',
          'gulp-mocha': '*',
          'gulp-istanbul': '*'
        }
      });
    });
  });
});
