const config = require('../config').common.database;

module.exports = {
  development: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'mssql'
  },
  testing: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'mssql'
  },
  production: {
    username: config.username,
    password: config.password,
    database: config.name,
    host: config.host,
    dialect: 'mssql'
  }
};
