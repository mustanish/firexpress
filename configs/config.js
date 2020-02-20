const deepFreeze = require('deep-freeze');

const config = {
  development: {
    env: 'development',
    port: 3000,
    dbHost: 'localhost',
    dbPort: 28015,
    dbName: 'buzzkhata'
  },
  production: {
    env: 'production',
    port: 3000,
    dbHost: 'localhost',
    dbPort: 28015,
    dbName: 'buzzkhata'
  }
};
module.exports = deepFreeze(config);
