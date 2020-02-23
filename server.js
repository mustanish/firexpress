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

const group = require('./routes/group');

app.use('/group', group);

// catch 404 and forward to error handler
app.use(function(_req, _res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, _req, res) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

const server = app.listen(global.config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on http://%s:%s`, server.address().address, server.address().port);
});
