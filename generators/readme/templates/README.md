# <%- projectName %>

`generator-toyproblem` creates a base template to start a new Toy Problem exercise.

## Install

`$ npm install --global generator-toyproblem`

## Usage

`$ yo toyproblem`

That'll generate a project with all the common tools setup. This includes:

* Filled `package.json`
* [Gulp](http://gulpjs.com/) task runner
* [Mocha](http://mochajs.org/) unit test
* [Chai](http://chaijs.com/) assertion library
* [ESLint](http://eslint.org/) linting and code style checking
* [Istanbul](https://github.com/gotwarlost/istanbul) code coverage
* MIT License

## Running Tests

Once the project is scaffolded, inside the project folder run:

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

MIT License © <%- year %> <%- author %>
