'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializae: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: {
    askForModuleName: function () {
      var done = this.async();

      var data = {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.options.name
      };

      this.prompt(data, function (answer) {
        this.options.name = _.kebabCase(answer.name);
        done();
      }.bind(this));
    }
  },

  writing: function () {
    // create project folder
    this.destinationRoot(this.destinationPath(this.options.name));
    // Update & Create package.json
    this.pkg.name = this.options.name;
    this.fs.writeJSON(this.destinationPath('package.json'), this.pkg);
  },

  default: function () {
    // Delegate creation of README.md file
    this.composeWith('toyproblem:readme', {}, {
      local: require.resolve('../readme')
    });
    // Delegate creation of LICENSE.md file
    this.composeWith('toyproblem:license', {}, {
      local: require.resolve('../license')
    });
    // Delegate creation of Git files
    this.composeWith('toyproblem:git', {}, {
      local: require.resolve('../git')
    });
    // Delegate creation of gulpfile
    this.composeWith('toyproblem:gulp', {}, {
      local: require.resolve('../gulp')
    });
    // Delegate creation of boilerplate files
    this.composeWith('toyproblem:gulp', {}, {
      local: require.resolve('../boilerplate')
    });
  }
});
