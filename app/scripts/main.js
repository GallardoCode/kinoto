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
  }
}

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });
