var Movie = require('../models/movie');
var MovieDao = require('../dao/movie_dao');


class MovieController {
  constructor() {
    this.dao = new MovieDao();
  }

  createMovie(movie) {
    var self = this;
    var context = this.dao.create(movie, (response) => {
      if (response === 'done') {
        console.log(response);
        //self.dao.updateCluster();
      }
    });
    console.dir(context);
  }
}


module.exports = MovieController;
