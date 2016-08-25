var Movie = require('../models/movie');
var MovieDao = require('../dao/movie_dao');
//var moviePrompt = require('../views/movie_view');


class MovieController {
  constructor() {
    this.dao = new MovieDao();
  }

  createMovie(movie) {
    this.dao.create(movie).then((result) => {
      this.dao.updateCluster();
      console.log('Movie saved');
      console.log(result);
    }).catch((err) => {
      console.log('something goes really bad D: => ', err);
    });
  }

  retriveListMovie() {
    this.dao.retriveList().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log('something goes really bad D: => ', err);
    });
  }

  updateView() {
    //moviePrompt();
  }

}

var testMovie = new Movie();
testMovie.title = 'Narnia: El leon la bruja y el ropero';
testMovie.year = '2007';

var mc = new MovieController();
mc.createMovie(testMovie);

module.exports = MovieController;
