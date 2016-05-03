'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  writing: function () {
    this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath('index.js'), {});
    this.fs.copyTpl(this.templatePath('test.js'), this.destinationPath('test.js'), {});
  }
});
