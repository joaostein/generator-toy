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
    this.composeWith('node:readme', {}, {
      local: require.resolve('../readme')
    });
    // Delegate creation of LICENSE.md file
    this.composeWith('node:license', {}, {
      local: require.resolve('../license')
    });
    // Delegate creation of Git files
    this.composeWith('node:git', {}, {
      local: require.resolve('../git')
    });
  }
});
