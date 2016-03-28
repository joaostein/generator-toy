'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: true });
    this.appname = _.camelCase(this.appname);
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
  },

  writing: function () {
    // crete project folder
    this.destinationRoot(this.destinationPath(this.appname));
    // Create package.json file
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
