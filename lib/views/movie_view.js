var MovieController = require('../controllers/movie_controller');
var Movie = require('../models/movie');

function moviePrompt() {
  var movie = new Movie();
  var mc = new MovieController();
  movie.title = 'Amo a tifis';
  movie.year = '2016';
  mc.createMovie(movie);
}

module.exports.moviePrompt = moviePrompt;
