# Trader Desktop Client
This is client application for [Trader Desktop](https://github.com/archfirst/trader-desktop).

## Requirements

- Install Node
    - on OSX, install [home brew](http://brew.sh/) and type `brew install node`
    - on Windows, use the installer available at [nodejs.org](http://nodejs.org/)
    - On OSX you can alleviate the need to run as sudo by [following John Papa's instructions](http://jpapa.me/nomoresudo)
- Open terminal
- Type `npm install -g node-inspector bower gulp`
- Install Ruby (required for Sass)
    - on OSX, Ruby comes pre-installed
    - on Windows, use the instructions [here](http://rubyinstaller.org/downloads/)
- Install Sass
    - `gem install sass` (on OSX you may need to `sudo` this command)

## Quick Start
Clone this repo and run the content locally:
```bash
$ npm install
$ bower install
$ gulp serve-dev
```
- `npm install` will install the required node libraries under `node_modules`.
- `bower install` will install the required client-side libraries under `bower_components`.
- `gulp serve-dev` will serve up the Angular application in a browser window. It is designed for an efficient development process. As you make changes to the code, the browser will update to reflect the changes immediately.

When you are ready to build the application for production, run the following command:
```bash
$ gulp serve-build
```

This will build a production-ready package in the `/build` folder.

## Folder Structure

The folder structure is somewhat simplified and flatter compared to John Papa's [Gulp Patterns](https://github.com/johnpapa/gulp-patterns) project. The description below includes reasons for some of my customizations.

### Highest Level Structure

```
/bower_components
/build
/mock-server
/node_modules
/src
/test
```

- `bower_components:` Bower components downloaded by `bower install` (do not check in)

- `build:` Production build (do not check in)

- `mock-server:` Used to serve the application during development and also to provide mock data. The real server is intended to be developed as a separate project utilizing best practices for the chosen server-side technology (see the [Node REST Template](https://github.com/archfirst/node-rest-template) for an example). This approach decouples client and server development so that they can progress independently and forces them to define tighter APIs.

- `node_modules:` Node.js modules downloaded by `npm install` (do not check in)

- `src:` contains all the client source files including HTML, styles (in SASS format), JavaScript and images

- `test:` contains client tests. This folder is intentionally kept separate from client source because I expect many different types of tests in this folder (unit, integration, acceptance). On real projects, the number of test files can easily exceed the number of source files, hence I like to keep the clutter away from the real source - just my preference!

### Source Folder Structure

```
/src
    /core
    /login
    /framework
    /images
    /trader
    /app.controller.js
    /app.module.js
    /app.scss
    /index.html
```

The `src` folder contains only the source for the AngularJS client application. It treats all 3 web technologies (HTML, CSS and JavaScript) as a first class citizens and arranges them into logical modules. At the highest level you will find the main html, css (well scss) and js files:

- `index.html`
- `app.scss`
- `app.module.js`
- `app.controller.js`

Below this level you will find various folders that arrange the application's functionality into logical modules.

- `framework:` Container for reusable services such as logging, exception handling, routing, security, local storage etc. These services are expected to work out-of-the-box without any changes for most applications. The template provides sample implementations for the first three. (This folder is called `blocks` in the gulp-patterns project.)

- `core:` contains functionality that is shared across the application and will probably need customization for a specific application. This includes directives, filters and services and styles common to the entire application.

- `trader:` A feature folder that implements a dashboard for trader client with rich functionality.

- `login:`: Another feature folder that implements a simple Login form.

## Tasks

### Task Listing

- `gulp help`

    Displays all of the available gulp tasks.

### Code Analysis

- `gulp vet`

    Performs static code analysis on all javascript files. Runs jshint and jscs.

- `gulp vet --verbose`

    Displays all files affected and extended information about the code analysis.

- `gulp plato`

    Performs code analysis using plato on all javascript files. Plato generates a report in the reports folder.

### Cleaning Up

- `gulp clean`

    Remove all files from the build and temp folders

- `gulp clean-images`

    Remove all images from the build folder

- `gulp clean-code`

    Remove all javascript and html from the build folder

- `gulp clean-fonts`

    Remove all fonts from the build folder

- `gulp clean-styles`

    Remove all styles from the build folder

### Fonts and Images

- `gulp fonts`

    Copy all fonts from source to the build folder

- `gulp images`

    Copy all images from source to the build folder

### Styles

- `gulp styles`

    Compile less files to CSS, add vendor prefixes, and copy to the build folder

### Bower Files

- `gulp wiredep`

    Looks up all bower components' main files and JavaScript source code, then adds them to the `index.html`.

    The `.bowerrc` file also runs this as a postinstall task whenever `bower install` is run.

### Angular HTML Templates

- `gulp templatecache`

    Create an Angular module that adds all HTML templates to Angular's $templateCache. This pre-fetches all HTML templates saving XHR calls for the HTML.

- `gulp templatecache --verbose`

    Displays all files affected by the task.

### Serving Development Code

- `gulp serve-dev`

    Serves the development code and launches it in a browser. The goal of building for development is to do it as fast as possible, to keep development moving efficiently. This task serves all code from the source folders and compiles less to css in a temp folder.

- `gulp serve-dev --nosync`

    Serves the development code without launching the browser.

- `gulp serve-dev --debug`

    Launch debugger with node-inspector.

- `gulp serve-dev --debug-brk`

    Launch debugger and break on 1st line with node-inspector.

### Building Production Code

- `gulp html`

    Optimize all javascript and styles, move to a build folder, and inject them into the new index.html

- `gulp build`

    Copies all fonts, copies images and runs `gulp html` to build the production code to the build folder.

### Serving Production Code

- `gulp serve-build`

    Serve the optimized code from the build folder and launch it in a browser.

- `gulp serve-build --nosync`

    Serve the optimized code from the build folder and manually launch the browser.

- `gulp serve-build --debug`

    Launch debugger with node-inspector.

- `gulp serve-build --debug-brk`

    Launch debugger and break on 1st line with node-inspector.
