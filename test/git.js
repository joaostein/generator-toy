'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('toyproblem:git', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('end', done);
  });

  it('should initialize git repository', function () {
    assert.file('.git');
  });

  it('should create .gitignorefile', function () {
    assert.file('.gitignore');
  });

  it('should add default files to .gitignore', function () {
    assert.fileContent('.gitignore', 'node_modules/');
    assert.fileContent('.gitignore', '.DS_Store');
  });
});
