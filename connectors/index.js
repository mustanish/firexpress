const deepFreeze = require('deep-freeze');
const database = require('./database');
const cache = require('./cache');

const option = { database, cache };

module.exports = deepFreeze(option);
