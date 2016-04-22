'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: {
    package: function () {
      var templatePath = this.templatePath('gulpfile.js');
      var destinationTemplatePath = this.destinationPath('gulpfile.js');
      this.fs.copyTpl(templatePath, destinationTemplatePath, {});

      var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

      _.merge(pkg, {
        devDependencies: {
          gulp: '*',
          'gulp-eslint': '*',
          'gulp-mocha': '*',
          'gulp-chai': '*',
          'gulp-istanbul': '*',
          mocha: '*'
        }
      });

      this.fs.writeJSON(this.destinationPath('package.json'), pkg);
    }
  }
});
