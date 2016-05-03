'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
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
        default: '0.0.0'
      }, {
        type: 'input',
        name: 'description',
        message: 'Your project description',
        default: 'This is a generic description. Please change it.'
      }, {
        type: 'input',
        name: 'authorName',
        message: 'Author\'s Name',
        default: this.user.git.name()
      }, {
        type: 'input',
        name: 'authorEmail',
        message: 'Author\'s Email',
        default: this.user.git.email()
      }, {
        type: 'input',
        name: 'authorUrl',
        message: 'Author\'s Homepage',
        default: ''
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
  },

  default: function () {
    // Delegate creation of package.json file
    this.composeWith('toyproblem:package', {
      options: {
        pkg: {
          name: this.options.name,
          version: this.options.version,
          description: this.options.description,
          main: 'index.js',
          scripts: {
            test: 'mocha'
          },
          license: 'MIT',
          author: {
            name: this.options.authorName,
            email: this.options.authorEmail,
            url: this.options.authorUrl
          }
        }
      }
    }, {
      local: require.resolve('../package')
    });

    // Delegate creation of README.md file
    this.composeWith('toyproblem:readme', {
      options: {
        name: this.options.name,
        description: this.options.description,
        author: this.options.authorName,
        year: (new Date()).getFullYear()
      }
    }, {
      local: require.resolve('../readme')
    });

    // Delegate creation of LICENSE.md file
    this.composeWith('toyproblem:license', {
      options: {
        author: this.options.authorName,
        year: (new Date()).getFullYear()
      }
    }, {
      local: require.resolve('../license')
    });

    // Delegate creation of Git files
    this.composeWith('toyproblem:git', {}, {
      local: require.resolve('../git')
    });

    // Delegate creation of boilerplate files
    this.composeWith('toyproblem:boilerplate', {}, {
      local: require.resolve('../boilerplate')
    });
  },

  installing: function () {
    this.npmInstall();
  }
});
