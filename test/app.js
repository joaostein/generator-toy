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

  describe('Defaults', function () {
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
      assert.fileContent('package.json', '"chai": "*"');
      assert.fileContent('package.json', '"mocha": "*"');
      assert.fileContent('package.json', '"jshint": "*"');
    });

    it('should include jshint config', function () {
      assert.fileContent('package.json', '"jshintConfig":');
      assert.fileContent('package.json', '"node": "true"');
      assert.fileContent('package.json', '"mocha": "true"');
    });
  });

  describe('README', function () {
    it('should fill with correct information', function () {
      assert.fileContent('README.md', '# ' + _.kebabCase(this.answers.name));
      assert.fileContent('README.md', this.answers.description);
      assert.fileContent('README.md', '* [Mocha](http://mochajs.org/) unit test');
      assert.fileContent('README.md', '* [Chai](http://chaijs.com/) assertion library');
      assert.fileContent('README.md', '* [JSHint](http://jshint.com/about/) code linting');
      assert.fileContent('README.md', '## Running Tests');
      assert.fileContent('README.md', '`$ npm test`');
      assert.fileContent('README.md', 'MIT License © ' + year + ', ' + this.answers.authorName);
    });
  });

  describe('Git', function () {
    it('should initialize git repository', function () {
      assert.file('.git');
    });

    it('should create .gitignore file', function () {
      assert.file('.gitignore');
    });

    it('should add default files to .gitignore', function () {
      assert.fileContent('.gitignore', 'node_modules/');
      assert.fileContent('.gitignore', '.DS_Store');
    });

    it('should create initial commit', function () {
      assert.file('.git/COMMIT_EDITMSG');
      assert.fileContent('.git/COMMIT_EDITMSG', 'Initial commit');
    });
  });


  describe('Files', function () {
    describe('index.js', function () {
      it('should exist', function () {
        assert.file('index.js');
      });

      it('should use strict mode', function () {
        assert.fileContent('index.js', '\'use strict\';');
      });

      it('should start with friendly comment', function () {
        assert.fileContent('index.js', '// your code here');
      });
    });

    describe('test.js', function () {
      it('should exist', function () {
        assert.file('test.js');
      });

      it('should use strict mode', function () {
        assert.fileContent('test.js', '\'use strict\';');
      });

      it('should require chai', function () {
        assert.fileContent('test.js', 'var chai = require(\'chai\');');
      });

      it('should use expect syntax', function () {
        assert.fileContent('test.js', 'var expect = chai.expect;');
      });

      it('should include documentation for reference', function () {
        assert.fileContent('test.js', 'http://chaijs.com/api/bdd/');
      });

      it('should have initial basic example', function () {
        assert.fileContent('test.js', 'it(\'should pass all tests\'');
        assert.fileContent('test.js', 'describe(\'Example\'');
        assert.fileContent('test.js', 'expect(true).to.equal(true);');
      });
    });
  });
});
