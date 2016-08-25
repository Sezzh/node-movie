var pg = require('pg');
var Movie = require('../models/movie');

class MovieDao {

  constructor() {
    let config = {
      user: 'postgres',
      database: 'index_example',
      password: 'tifis',
      port: 4444,
      max: 10,
      idleTimeOutMillis: 3000
    };
    this.pool = new pg.Pool(config);
    this.client = null;
  }

  create(movie) {
    //Query String
    let query = `INSERT INTO movie(title, year) VALUES ` +
      `('${movie.title}', '${movie.year}')`;

    return this.pool.connect().then((client) => {
      this.client = client;
      return Promise.all([client, client.query(query)]);
    }).then((response) => {
      response[0].end();
      return Promise.resolve(response[1]);
    }).catch((err) => {
      this.client.end();
      return Promise.reject(err);
    });
  }

  update(movie) {
    //TODO
  }

  retriveList() {
    //Query String
    let query = `SELECT * FROM movie`;

    return this.pool.connect().then((client) => {
      this.client = client;
      return Promise.all([client, client.query(query)]);
    }).then((response) => {
      response[0].end();
      var result = {
        objectsCount: response[1].rowCount,
        movies: response[1].rows
      };
      return Promise.resolve(result);
    }).catch((err) => {
      this.client.end();
      return Promise.reject(err);
    });
  }

  updateCluster() {
    let query = `CLUSTER movie`;
    return this.pool.connect().then((client) => {
      this.client = client;
      return Promise.all([client, client.query(query)]);
    }).then((response) => {
      response[0].end();
      console.dir(response[1]);
    }).catch((err) => {
      this.client.end();
      console.log('something goes really bad D: => ', err);
    });
  }

}

module.exports = MovieDao;
