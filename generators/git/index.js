'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    var templatePath = this.templatePath('.gitignore');
    var destinationTemplatePath = this.destinationPath('.gitignore');
    this.fs.copyTpl(templatePath, destinationTemplatePath, {});
  },

  end: function () {
    this.spawnCommandSync('git', ['init', '--quiet']);
  }
});
