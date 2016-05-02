'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('toyproblem:gulp', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .on('end', done);
  });

  it('should run test', function () {
    assert(1, true);
  });
});
