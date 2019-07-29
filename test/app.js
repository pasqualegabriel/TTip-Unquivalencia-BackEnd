'use strict';

const fs = require('fs'),
  path = require('path'),
  chai = require('chai'),
  chaiHttp = require('chai-http'),
  models = require('../app/models');

chai.use(chaiHttp);

// THIS WORKS ONLY WITH MYSQL
beforeEach('drop tables, re-create them and populate sample data', () =>
  models.sequelize
    .query('SET FOREIGN_KEY_CHECKS = 0;')
    .then(() => models.sequelize.query('delete from users;'))
    .then(() => models.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;'))
);

// including all test files
const normalizedPath = path.join(__dirname, '.');

const requireAllTestFiles = pathToSearch => {
  fs.readdirSync(pathToSearch).forEach(file => {
    if (fs.lstatSync(`${pathToSearch}/${file}`).isDirectory()) {
      requireAllTestFiles(`${pathToSearch}/${file}`);
    } else {
      require(`${pathToSearch}/${file}`);
    }
  });
};

requireAllTestFiles(normalizedPath);
