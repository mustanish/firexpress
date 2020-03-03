const deepFreeze = require('deep-freeze');

const config = {
  development: {
    port: 3000
  },
  production: {
    port: 3000
  }
};
module.exports = deepFreeze(config);
