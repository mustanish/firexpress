const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('./utils/logger');

const app = express();

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.get('/', function(req, res) {
  res.send('Express Module With Docker Setup');
});

const routes = require('./routes');

app.use('/', routes);

// 404
app.use((req, res) => {
  res.status(404).send({ message: `Route${req.url} Not found.` });
});

// Any server error
app.use((err, req, res) => {
  res.status(500).send({ error: err });
});

module.exports = app;
