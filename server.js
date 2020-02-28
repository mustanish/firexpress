const bodyParser = require('body-parser');
const cors = require('cors');

const env = process.env.NODE_ENV || 'development';
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./configs/startup');
const winston = require('./utils/logger');

const app = express();
global.config = config[env];

app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.get('/', function(req, res) {
  res.send('People Module Setup');
});

const routes = require('./routes');

app.use('/', routes);

// 404
app.use(function(req, res) {
  res.status(404).send({ message: `Route${req.url} Not found.` });
});

// Any server error
app.use(function(err, req, res) {
  res.status(500).send({ error: err });
});

const server = app.listen(global.config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on http://%s:%s`, server.address().address, server.address().port);
});
