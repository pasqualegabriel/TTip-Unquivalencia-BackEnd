const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('./app/logger');
const errors = require('./app/middlewares/errors');
const { init } = require('./app/routes');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

init(app);

app.use('/*', (req, res) =>
  res.status(404).send({
    message: 'Route not found'
  })
);

app.use(errors.handle);

const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

logger.info(`listen in port: ${port}`);

module.exports = app;
