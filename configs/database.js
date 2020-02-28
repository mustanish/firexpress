const { Client } = require('pg');

const connectionString = `postgresql://yugabyte:yugabyte@localhost:5433/buzzkhata`;
const client = new Client(connectionString);
module.exports = client;
