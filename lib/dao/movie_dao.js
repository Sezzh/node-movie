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

  connect() {
    return this.pool.connect().then((client) => {
      this.client = client;
      return Promise.resolve('done');
    }).catch((err) => {
      return Promise.reject('No connection with the db :c');
    });
  }

  create(movie) {
    //Query String
    let query = `INSERT INTO movie(title, year) VALUES ` +
      `('${movie.title}', '${movie.year}')`;

    return this.connect().then(() => {
      return this.client.query(query);
    }).then((response) => {
      this.client.end();
      return Promise.resolve(response);
    }).catch((err) => {
      if (this.client) {
        this.client.end();
      }
      return Promise.reject(err);
    });


  }

  update(movie) {
    //TODO
  }

  retriveList() {
    //Query String
    let query = `SELECT * FROM movie`;

    return this.connect().then(() => {
      return this.client.query(query);
    }).then((response) => {
      this.client.end();
      var result = {
        objectsCount: response.rowCount,
        movies: response.rows
      };
      return Promise.resolve(result);
    }).catch((err) => {
      this.client.end();
      return Promise.reject(err);
    });
  }

  updateCluster() {
    let query = `CLUSTER movie`;
    return this.connect().then(() => {
      return this.client.query(query);
    }).then((response) => {
      this.client.end();
      console.dir(response);
    }).catch((err) => {
      this.client.end();
      console.log('Cluster movie blows up! D: ', err);
    });
  }

}

module.exports = MovieDao;
