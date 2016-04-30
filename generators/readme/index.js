'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    var author = this.options.author;
    var year = this.options.year;

    var templatePath = this.templatePath('README.md');
    var destinationTemplatePath = this.destinationPath('README.md');

    this.fs.copyTpl(templatePath, destinationTemplatePath, {
      projectName: this.options.projectName,
      year: year,
      author: author
    });
  }
});
