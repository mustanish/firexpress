const { Pool } = require('pg');

const connectionString = 'postgres://postgres@localhost:5433/postgres';
const pool = new Pool(connectionString);
module.exports = { pool };
