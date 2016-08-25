var MovieController = require('../controllers/movie_controller');
var Movie = require('../models/movie');
const readline = require('readline');

//TODO: Need to refactor.

function moviePrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  var movie = new Movie();
  var mc = new MovieController();
  rl.question("Movie's title: ", (answer) => {
    movie.title = answer;
    rl.question("Movie's year: ", (answer) => {
      movie.year = answer;
      rl.close();
      console.log('saving movie...');
      mc.createMovie(movie);
    });
  });

}

module.exports.moviePrompt = moviePrompt;
