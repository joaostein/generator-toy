'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    var templatePath = this.templatePath('LICENSE.md');
    var destinationTemplatePath = this.destinationPath('LICENSE.md');
    this.fs.copyTpl(templatePath, destinationTemplatePath, {});
  }
});
