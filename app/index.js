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

  writing: {
    base: function () {
      this.destinationRoot(this.destinationPath(this.options.name));
    },

    packageJSON: function () {
      var templatePath = this.templatePath('package.json');
      var destinationTemplatePath = this.destinationPath('package.json');

      this.fs.copyTpl(templatePath, destinationTemplatePath, this.options);
    },

    readme: function () {
      var templatePath = this.templatePath('README.md');
      var destinationTemplatePath = this.destinationPath('README.md');

      this.fs.copyTpl(templatePath, destinationTemplatePath, {
        name: this.options.name,
        description: this.options.description,
        year: (new Date()).getFullYear(),
        author: this.options.authorName
      });
    },

    license: function () {
      var templatePath = this.templatePath('LICENSE');
      var destinationTemplatePath = this.destinationPath('LICENSE');

      this.fs.copyTpl(templatePath, destinationTemplatePath, {
        year: (new Date()).getFullYear(),
        author: this.options.authorName
      });
    },

    git: function () {
      var templatePath = this.templatePath('.gitignore');
      var destinationTemplatePath = this.destinationPath('.gitignore');
      this.fs.copyTpl(templatePath, destinationTemplatePath, {});
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
