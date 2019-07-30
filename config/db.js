const config = require('../config').common.database;

module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    port: config.port,
    dialect: 'mysql'
  },
  testing: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    port: config.port,
    dialect: 'mysql'
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    port: config.port,
    dialect: 'mysql'
  }
};
