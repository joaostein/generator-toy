'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var _ = require('lodash');
var year = (new Date()).getFullYear();

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
        'index.js',
        'test.js'
      ];

      assert.file(expected);
    });

    it('should include updated and named license file', function () {
      assert.fileContent('LICENSE', 'Copyright (c) ' + year + ' ' + this.answers.authorName);
    });
  });

  describe('package.json', function () {
    it('should fill with correct information', function () {
      assert.fileContent('package.json', '"name": "' + _.kebabCase(this.answers.name) + '"');
      assert.fileContent('package.json', '"description": "' + this.answers.description + '"');
      assert.fileContent('package.json', '"name": "' + this.answers.authorName + '"');
      assert.fileContent('package.json', '"email": "' + this.answers.authorEmail + '"');
      assert.fileContent('package.json', '"url": "' + this.answers.authorUrl + '"');
    });

    it('should have dependencies', function () {
      assert.fileContent('package.json', '"chai": "^');
      assert.fileContent('package.json', '"mocha": "^');
      assert.fileContent('package.json', '"jshint": "^');
    });
  });

  describe('README', function () {
    it('should exist', function () {
      assert.file('README.md');
    });

    it('should have a main title with project name', function () {
      assert.fileContent('README.md', '# ' + _.kebabCase(this.answers.name));
    });

    it('should have license reference', function () {
      assert.fileContent('README.md', 'MIT License © ' + year + ', ' + this.answers.authorName);
    });

    it('should have basic description', function () {
      assert.fileContent('README.md', this.answers.description);
    });

    it('should have tech stack description', function () {
      assert.fileContent('README.md', '* [Mocha](http://mochajs.org/) unit test');
      assert.fileContent('README.md', '* [Chai](http://chaijs.com/) assertion library');
      assert.fileContent('README.md', '* [JSHint](http://jshint.com/about/) code linting');
    });

    it('should have test instructions', function () {
      assert.fileContent('README.md', '## Running Tests');
      assert.fileContent('README.md', '`$ npm test`');
    });
  });
});
