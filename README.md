# Toy problem Generator

`generator-toy` creates a base template to start a new [Toy Problem](https://en.wikipedia.org/wiki/Toy_problem).

## Install

`$ npm install --global generator-toy`

## Usage

`$ yo toy`

That'll generate a project with all the common tools setup. This includes:

* Filled `package.json`
* [Mocha](http://mochajs.org/) unit test
* [Chai](http://chaijs.com/) assertion library
* [JSHint](http://jshint.com/about/) code linting
* MIT License

## Running Tests

`$ npm test`

## Options

Here's a list of our supported options:

* `name` (_String_, default `toyproblem-boilerplate`) Specify the project name.
* `version` (_String_, default `0.0.0`) Specify the version.
* `description` (_String_) Specify the project description.
* `authorName` (_String_) Specify the author name.
* `authorEmail` (_String_) Specify the author email.
* `authorUrl` (_String_) Specify the author homepage url.

## License

MIT License © 2015, Joao Stein.
