'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator:app', function () {
  var FOLDER_NAME = 'example';

  describe('defaults', function () {
    before(function (done) {
      var generatorPath = path.join(__dirname, '../app');
      helpers.run(generatorPath)
        .withArguments([FOLDER_NAME])
        .on('end', done);
    });

    it('created and CD into a folder named with the arguments', function () {
      assert.equal(path.basename(process.cwd()), FOLDER_NAME);
    });
  });
});
