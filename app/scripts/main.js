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
    const testMovies = [
      {
        title: 'Movie One',
        priority: 5
      },
      {
        title: 'Movie Two',
        priority: 5
      }
    ];

    const movies = testMovies;
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
      movies = JSON.parse(localStorage.getItem('books'));
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

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayMovies);

// Event: Add a Book
document.querySelector('#movie-form').addEventListener('submit', e => {
  // Prevent submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const priority = document.querySelector('#priority').value;

  // Validate
  if (title === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate movie
    const movie = new Movie(title, priority);
    console.log(movie);
    UI.clearFields();
  }
});

// Event: Remove a book
document.querySelector('#movie-list').addEventListener('click', e => {
  UI.deleteMovie(e.target);
  UI.showAlert('Book Removed', 'success');
});
// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
