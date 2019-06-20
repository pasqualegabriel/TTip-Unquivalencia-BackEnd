const config = require('../config').common.database;

module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres'
  },
  testing: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres'
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'postgres'
  }
};
