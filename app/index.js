'use strict';

var generators = require('yeoman-generator');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: true });
    this.appname = _.camelCase(this.appname);
  },

  initializing: function () {
    mkdirp(this.appname);
    this.destinationRoot(this.destinationPath(this.appname));
  }
});
