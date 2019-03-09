import { listenerCount } from "cluster";

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
}

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
