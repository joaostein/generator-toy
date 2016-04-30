'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('toyproblem:boilerplate', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('end', done);
  });

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

  describe('test/test.js', function () {
    it('should exist', function () {
      assert.file('test/test.js');
    });

    it('should use strict mode', function () {
      assert.fileContent('test/test.js', '\'use strict\';');
    });

    it('should require chai', function () {
      assert.fileContent('test/test.js', 'var chai = require(\'chai\');');
    });

    it('should use expect syntax', function () {
      assert.fileContent('test/test.js', 'var expect = chai.expect;');
    });

    it('should have initial basic example', function () {
      assert.fileContent('test/test.js', 'it(\'should pass all tests\'');
      assert.fileContent('test/test.js', 'describe(\'Example\'');
      assert.fileContent('test/test.js', 'expect(true).to.equal(true);');
    });
  });
});
