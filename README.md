# Betahealth

This application is a Node based application that runs on [beta.nhs.uk](http://beta.nhs.uk).

## Dependencies

* [Node.js v6](https://nodejs.org/en/)
* [NPM v3](https://github.com/npm/npm)

## Installation

1. Clone repository:

  ```
  git clone https://github.com/nhsalpha/betahealth
  ```

2. Install node dependencies:

  ```
  npm install
  ```

3. Run the application

  ```
  npm start
  ```

## Development

### Development dependencies

* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler](http://bundler.io/)

[scss-lint](https://github.com/brigade/scss-lint) is used for code linting
but adds the ruby dependency. Linting is run as part of the commit process
so scss-lint will need to be installed.

To install ruby dependencies:
```
bundle install
```

### Run development mode

You can run the server in develop mode. Develop mode auto restarts
the node server if you make any changes to it and if you connect to the server
using [http://localhost:3001](http://localhost:3001) this will use
[browser-sync](https://www.browsersync.io/) to automatically show
any changes instantly in the browser.

To run develop mode:

```
npm run develop
```

In addition you can build the code yourself using gulp:

```
gulp build
```

or lint the code for styleguide warnings and errors

```
npm run lint
```

If you want to update build related code and scripts then each task is a [gulp](http://gulpjs.com/) script located at '*gulp/tasks*'.
