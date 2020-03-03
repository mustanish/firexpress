const env = process.env.NODE_ENV || 'development';
const { createLogger, transports } = require('winston');
const OPTIONS = require('../configs/logger');

const logger = createLogger({
  transports: [
    env === 'development'
      ? new transports.Console(OPTIONS.console)
      : new transports.File(OPTIONS.file)
  ],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};
module.exports = logger;
