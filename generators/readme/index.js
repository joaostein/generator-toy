'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    var templatePath = this.templatePath('README.md');
    var destinationTemplatePath = this.destinationPath('README.md');

    this.fs.copyTpl(templatePath, destinationTemplatePath, {
      name: this.options.name,
      description: this.options.description,
      year: this.options.year,
      author: this.options.author
    });
  }
});
