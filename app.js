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

// routes
require('./routes/group')(app);

// 404
app.use((req, res, next) => {
  const err = new Error(`Route${req.url} Not found.`);
  err.status = 404;
  next(err);
});

// Any server error
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
