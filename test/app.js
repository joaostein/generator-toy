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
        'gulpfile.js',
        'index.js',
        'test/test.js'
      ];

      assert.file(expected);
    });

    it('should include updated and named license file', function () {
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
      assert.fileContent('README.md', '* [Gulp](http://gulpjs.com/) task runner');
      assert.fileContent('README.md', '* [Mocha](http://mochajs.org/) unit test');
      assert.fileContent('README.md', '* [Chai](http://chaijs.com/) assertion library');
      assert.fileContent('README.md', '* [ESLint](http://eslint.org/) linting and code style checking');
      assert.fileContent('README.md', '* [Istanbul](https://github.com/gotwarlost/istanbul) code coverage');
    });

    it('should include usage instructions', function () {
      assert.fileContent('README.md', '## Usage');
      assert.fileContent('README.md', '`$ npm install`');
    });

    it('should have test instructions', function () {
      assert.fileContent('README.md', '## Running Tests');
      assert.fileContent('README.md', '`$ npm test`');
    });
  });
});
