'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('name', {
      type: String,
      required: true,
      defaults: 'toyproblem-boilerplate',
      desc: 'Project name'
    });

    this.option('version', {
      type: String,
      required: true,
      defaults: '0.0.0',
      desc: 'Project version'
    });
  },

  initializae: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  prompting: {
    askFor: function () {
      var done = this.async();

      var prompts = [{
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.options.name
      }, {
        type: 'input',
        name: 'version',
        message: 'Your project version',
        default: this.options.version
      }];

      this.prompt(prompts, function (props) {
        props.name = _.kebabCase(props.name);
        this.options = _.merge(this.options, props);
        done();
      }.bind(this));
    }
  },

  writing: function () {
    // create project folder
    this.destinationRoot(this.destinationPath(this.options.name));
    // Update & Create package.json
    this.fs.writeJSON(this.destinationPath('package.json'), this.options);
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
