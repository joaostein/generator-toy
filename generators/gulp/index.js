'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: {
    package: function () {
      var templatePath = this.templatePath('gulpfile.js');
      var destinationTemplatePath = this.destinationPath('gulpfile.js');
      this.fs.copyTpl(templatePath, destinationTemplatePath, {});
    }
  }
});
