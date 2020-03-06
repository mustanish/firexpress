const deepFreeze = require('deep-freeze');
const database = require('./database');

const option = {
  database
};

module.exports = deepFreeze(option);
