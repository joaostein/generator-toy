'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function () {
    this.options.year = (new Date()).getFullYear();
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

  writing: {
    base: function () {
      this.destinationRoot(this.destinationPath(this.options.name));
    },

    packageJSON: function () {
      this.fs.copyTpl(this.templatePath('package.json'), this.destinationPath('package.json'), this.options);
    },

    readme: function () {
      this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
        name: this.options.name,
        description: this.options.description,
        year: this.options.year,
        author: this.options.authorName
      });
    },

    license: function () {
      this.fs.copyTpl(this.templatePath('LICENSE'), this.destinationPath('LICENSE'), {
        year: this.options.year,
        author: this.options.authorName
      });
    },

    git: function () {
      this.fs.copyTpl(this.templatePath('.gitignore'), this.destinationPath('.gitignore'), {});
    },

    boilerplate: function () {
      this.fs.copyTpl(this.templatePath('index.js'), this.destinationPath('index.js'), {});
      this.fs.copyTpl(this.templatePath('test.js'), this.destinationPath('test.js'), {});
    }
  },

  install: function () {
    this.npmInstall(['chai', 'mocha', 'jshint'], { saveDev: true });
    this.npmInstall();
  },

  end: function () {
    this.spawnCommandSync('git', ['init', '--quiet']);
    this.spawnCommandSync('git', ['add', '.']);
    this.spawnCommandSync('git', ['commit', '-m', 'Initial commit', '--quiet']);
  }
});
