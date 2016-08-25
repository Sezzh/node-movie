var pg = require('pg');
var Movie = require('../models/movie');

class MovieDao {
  constructor() {
    this.client = new pg.Client('postgres://postgres@localhost/index_example');

    let config = {
      user: 'postgres',
      database: 'index_example',
      password: 'tifis',
      port: 5432,
      max: 10,
      idleTimeOutMillis: 3000
    };

    this.pool = new pg.Pool(config);
  }

  create(movie) {
    console.dir(movie);
    let query = `INSERT INTO movie(titl, year) VALUES ` +
      `('', '${movie.year}')`; //${movie.title}
    return this.pool.connect().then((client) => {
      return client.query(query).then((result) => {
        console.log('we get the result from the database');
        client.end();
        return Promise.resolve(result);
      }).catch((err) => {
        console.log('error in: ', err);
        return Promise.reject(err);
      });
    });
  }

  update(movie) {

  }

  updateCluster() {
    var clusterUpdate = `CLUSTER movie`;
    this.pool.connect((err, client, done) => {
      client.query(clusterUpdate, (err, result) => {
        console.log('coming to updateCluster');
      });
    });
  }
}

module.exports = MovieDao;
