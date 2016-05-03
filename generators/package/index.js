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
        gulp: '*',
        chai: '*',
        mocha: '*',
        jshint: '*'
      }
    });

    // Update & Create package.json
    this.fs.writeJSON(this.destinationPath('package.json'), this.options.pkg);
  }
});
