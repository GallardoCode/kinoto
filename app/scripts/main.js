import $ from 'jquery';
import Bootstrap from 'bootstrap'; // eslint-disable-line no-unused-vars
import AppConfig from './config';

/**
 *Creates a Movie
 *
 * @class Movie
 */
class Movie {
  constructor(title, priority) {
    this.title = title;
    this.priority = priority;
  }
}

/**
 * The Movie Database class to interact with the API
 *
 * @class TheMovieDB
 */
class TheMovieDB {
  static getConfig(config, success, fail) {
    if (config === Object(config)) {
      TheMovieDB.apiKey = config.apiKey;
      TheMovieDB.baseUri = config.baseUri;
      TheMovieDB.imagesUri = config.imagesUri;
    }
    TheMovieDB.tmdbQuery('/configuration', '', success, fail);
  }

  static tmdbQuery(url, params, success, fail) {
    const apiKeyString = `api_key=${TheMovieDB.apiKey}`;
    let paramsString = '';
    if (params === Object(params)) {
      Object.entries(params).forEach(([k, v]) => {
        paramsString += `&${k}=${encodeURIComponent(v)}`;
      });
    }
    const request = `${
      TheMovieDB.baseUri
    }${url}?${apiKeyString}${paramsString}`;
    console.log(request);
    fetch(request).then(response => {
      if (response.ok) {
        return response
          .json()
          .then(result => {
            if (typeof success === 'function') {
              console.log('are we here');
              success(result);
            } else {
              throw new Error('No success callback but successful request');
            }
          })
          .catch(e => {
            if (typeof fail === 'function') {
              fail(e.message);
            } else {
              if (e.message === 'No success callback but successful request') {
                throw new Error(e.message);
              }
              throw new Error(
                `No fail callback unsuccesful request ${response.statusText}`
              );
            }
          });
      }
      return response
        .json()
        .catch(e => {
          throw new Error(response.statusText);
        })
        .then(result => {
          throw new Error(result.status_message);
        })
        .catch(e => {
          if (typeof fail === 'function') {
            fail(e.message);
          } else {
            throw new Error(`No fail callback: ${e.message}`);
          }
        });
    });
  }
}

/**
 *Creates the UI class for UI manipulation
 *
 * @class UI
 */
class UI {
  /**
   *Populate the movie list with movie data
   *
   * @static
   * @memberof UI
   */
  static displayMovies() {
    const movies = Store.getMovies();
    movies.forEach(movie => UI.addMovieToList(movie));
  }

  /**
   *Adds movie as a row to the movie-list tb
   *
   * @static
   * @param {*} movie object
   * @memberof UI
   */
  static addMovieToList(movie) {
    const movieList = document.querySelector('#movie-list');
    const row = document.createElement('tr');
    const fragment = document.createDocumentFragment();
    const button = document.createElement('a');
    button.href = '#';
    button.className = 'btn btn-danger btn-sm delete';
    button.textContent = 'x';
    let col;
    Object.entries(movie).forEach(([k, v]) => {
      col = document.createElement('td');
      col.textContent = v;
      fragment.appendChild(col);
    });
    col = document.createElement('td');
    col.appendChild(button);
    fragment.appendChild(col);
    row.appendChild(fragment);
    movieList.appendChild(row);
  }

  /**
   *Delete movie
   *
   * @static
   * @param {*} el element clicked
   * @memberof UI
   */
  static deleteMovie(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  /**
   *Show alert message above the form
   *
   * @static
   * @param {*} message string to display as message
   * @param {*} className class name to style the alert
   * @memberof UI
   */
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#movie-form');
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  /**
   *Clear Fields in movie form
   *
   * @static
   * @memberof UI
   */
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#priority').value = 1;
  }

  static addSearch() {
    const button = document.createElement('input');
    button.className = `btn btn-secondary`;
    button.type = 'button';
    button.value = 'Search DB';
    button.setAttribute('id', 'search-button');
    const formGroup = document.querySelector(
      '#movie-form .btn-group-justified'
    );
    const addButton = document.querySelector('#add-button');
    formGroup.insertBefore(button, addButton);
  }
}

/**
 * Class to manage storage
 *
 * @class Store
 */
class Store {
  /**
   * Get movies from local storage as objects
   *
   * @static
   * @returns array of movies
   * @memberof Store
   */
  static getMovies() {
    let movies;
    if (localStorage.getItem('movies') === null) {
      movies = [];
    } else {
      movies = JSON.parse(localStorage.getItem('movies'));
    }
    return movies;
  }

  /**
   * Add movies to local storage as string
   *
   * @static
   * @param {*} movie single movie as object
   * @memberof Store
   */
  static addMovie(movie) {
    const movies = Store.getMovies();
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
  }

  /**
   *Remove movie from local storage
   *
   * @static
   * @param {*} title title of movie
   * @memberof Store
   */
  static removeMovie(title) {
    const movies = Store.getMovies();
    movies.forEach((movie, index) => {
      if (movie.title === title) {
        movies.splice(index, 1);
      }
    });
    localStorage.setItem('movies', JSON.stringify(movies));
  }
}

// Event: Display Movies
document.addEventListener('DOMContentLoaded', () => {
  UI.displayMovies();
  TheMovieDB.getConfig(AppConfig, UI.addSearch);
});

// Event: Add a Movies
document.querySelector('#movie-form').addEventListener('submit', e => {
  // Prevent submit
  e.preventDefault();
  console.log(e.target);
  // Get form values
  const title = document.querySelector('#title').value;
  const priority = document.querySelector('#priority').value;

  // Validate
  if (title === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate movie
    const movie = new Movie(title, priority);
    // Store movie in local storage
    Store.addMovie(movie);
    // Display movie
    UI.addMovieToList(movie);
    console.log(movie);
    UI.clearFields();
  }
});

// Event: Remove a Movie
document.querySelector('#movie-list').addEventListener('click', e => {
  UI.deleteMovie(e.target);
  // Remove Movie from storage
  Store.removeMovie(
    e.target.parentElement.parentElement.firstChild.textContent
  );
  console.log(e.target.parentElement.parentElement.firstChild);
  UI.showAlert('Movie Removed', 'success');
});
// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
