const { createClient } = require('redis');
const { promisify } = require('util');
const winston = require('../utils/logger');

const client = createClient({ url: process.env.CACAHE_URL });
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const get = async key => {
  try {
    return await getAsync(key);
  } catch (error) {
    winston.error(`Unable to get value, with following error ${error}`);
    return null;
  }
};

const set = async (key, value) => {
  try {
    return await setAsync(key, value);
  } catch (error) {
    winston.error(`Unable to set value, with following error ${error}`);
    return null;
  }
};

module.exports = { get, set };

/* docker run -v redisinsight:/db -p 8001:8001 redislabs/redisinsight */
