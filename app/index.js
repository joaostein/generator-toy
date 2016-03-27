'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);

    // Next, add your custom code
    this.option('coffee'); // This method adds support for a `--coffee` flag

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    // And you can then access it later on this way; e.g. CamelCased
    this.appname = _.camelCase(this.appname);
  },

  prompting: function () {
    // var done = this.async();
    // this.prompt({
    //   type    : 'input',
    //   name    : 'name',
    //   message : 'Your project name',
    //   default : 'toyproblem-scaffold'
    // }, function (answers) {
    //   this.log(answers.name);
    //   done();
    // }.bind(this));
  },

  paths: function () {
    this.log('.destinationRoot() =>', this.destinationRoot());
    // returns '~/projects'

    this.log('.destinationPath() =>', this.destinationPath('index.js'));
    // returns '~/projects/index.js'

    this.log('.sourceRoot() =>', this.sourceRoot());
    // returns './templates'

    this.log('.templatePath() =>', this.templatePath('index.js'));
    // returns './templates/index.js'
  },

  method1: function () {
    this.log(this.appname);
    this.log('method 1 just ran');
  },

  method2: function () {
    this.log('method 2 just ran');
  }
});
