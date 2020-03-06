const { Pool } = require('pg');
const winston = require('../utils/logger');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const execute = async query => {
  const client = await pool.connect();
  try {
    console.log('QUERY::', query);
    const { rows } = await client.query(query);
    return rows;
  } catch (err) {
    winston.error(`Unable to execute query, with following error ${err.stack}`);
    return null;
  } finally {
    client.end();
  }
};

module.exports = { execute };
