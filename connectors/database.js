const { Pool } = require('pg');
const { BAD_REQUEST } = require('http-status-codes');
const winston = require('../utils/logger');
const GLOBAL_CONSTANT = require('../constants');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const execute = async (query, next) => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(query);
    return rows;
  } catch (err) {
    winston.error(`Unable to execute query, with following error ${err.message}`);
    return {
      code: BAD_REQUEST,
      data: { status: GLOBAL_CONSTANT.failed, error: err.message }
    };
  } finally {
    client.release();
  }
};

module.exports = { execute };
