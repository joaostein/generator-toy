'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var child = require('child_process');

var getLatestVersion = function (packageName) {
  return '^' + child.execSync('npm show ' + packageName + ' version').toString().split('\n')[0];
};

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    var mochaLatestVersion = getLatestVersion('mocha');
    var chaiLatestVersion = getLatestVersion('chai');
    var jshintLatestVersion = getLatestVersion('jshint');

    _.merge(this.options.pkg, {
      devDependencies: {
        chai: chaiLatestVersion,
        mocha: mochaLatestVersion,
        jshint: jshintLatestVersion
      },
      jshintConfig: {
        node: 'true',
        mocha: 'true'
      }
    });

    // Update & Create package.json
    this.fs.writeJSON(this.destinationPath('package.json'), this.options.pkg);
  }
});
