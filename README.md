# Kinoto Must Watch Movie App

This webapp was made to keep track of movies you want to watch.

## Tabel of Contents

- [Kinoto Must Watch Movie App](#kinoto-must-watch-movie-app)
  - [Tabel of Contents](#tabel-of-contents)
  - [Objectives and Requirements](#objectives-and-requirements)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Acknowledgments](#acknowledgments)

## Objectives and Requirements

The movie list populates with movies input by the user. The suer can add or remove movies from the list and get feedback. (TODO) The fields will search movies from TheMovieDB and show the most popular to the user who can then add the movie to the list.

## Technologies

This project was made with the following technologies:

- HTML5
- SaSS
- Javascript ES6
- Yeoman Generator Webapp (Sass, Modernizer, npm, gulp, bootstrap)
- Webpack babel loader implemented to the gulp js tasks.

Source code found in /app, compiled site runs from /dist

## Getting Started

To develop the app locally you must have [node.js](https://nodejs.org/en/) and [git](https://git-scm.com/) installed on your computer.

Clone or download the project and go to the project folder and install dependencies

```console

cd kinoto
npm install

```

Once installed, you can now run `npm start` to build start the server and build the development files for the project. This will create a .tmp folder to be used by the webserver and viewable at
`http://localhost:9000`

For production ready project with full compression on code and assets then use

```console

npm run build

```

### Prerequisites

Webpack module loader uses babel to transpile es6 code as backwards compatible as much as possible, the limitations can be found [here](https://babeljs.io/docs/en/caveats).

## Acknowledgments

- This app is based on the Booklist app from [Traversy Media](https://www.youtube.com/user/TechGuyWeb)
- Bootstrap theme, sass variables and fonts from [bootswatch](https://bootswatch.com/)
- FontAwesome Sass version [here](https://fontawesome.com/how-to-use/on-the-web/using-with/sass)
- Yeoman Generator Webapp build process scaffold using [here](https://github.com/yeoman/generator-webapp)
