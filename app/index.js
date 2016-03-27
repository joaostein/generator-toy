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

  method1: function () {
    console.log(this.appname);
    console.log('method 1 just ran');
  },

  method2: function () {
    console.log('method 2 just ran');
  }
});
