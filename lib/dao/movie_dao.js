var pg = require('pg');
var Movie = require('../models/movie');

class MovieDao {
  constructor() {
    this.client = new pg.Client('postgres://postgres@db/index_example');

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

  create(movie, callback) {

    let query = `INSERT INTO movie(title, year) VALUES ` +
      `('${movie.title}', ${movie.year})`;

    return this.pool.connect((err, client, done) => {
      if (err) {
        return console.error('something goes really bad...', err);
      }

      client.query(query, (err, result) => {
        callback('done');
        done();
        return result;
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
