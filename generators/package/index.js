'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    _.merge(this.options.pkg, {
      devDependencies: {
        chai: '*',
        mocha: '*',
        jshint: '*'
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
