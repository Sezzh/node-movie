var Movie = require('../models/movie');
var MovieDao = require('../dao/movie_dao');


class MovieController {
  constructor() {
    this.dao = new MovieDao();
  }

  createMovie(movie) {
    this.dao.create(movie).then((result) => {
      console.log('Our result: ');
      console.log(result);
    }).catch((err) => {
      console.log('we got an error', err);
      console.log('llegamos a catch en controller');
    });
  }

  retriveListMovie() {
    //TODO
  }
}


module.exports = MovieController;
