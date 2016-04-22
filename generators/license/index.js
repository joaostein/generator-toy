'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    var author = this.options.author;
    var year = this.options.year;

    var templatePath = this.templatePath('LICENSE');
    var destinationTemplatePath = this.destinationPath('LICENSE');

    this.fs.copyTpl(templatePath, destinationTemplatePath, {
      year: year,
      author: author
    });
  }
});
