const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;
const client = new Client(connectionString);
module.exports = client;

// eslint-disable-next-line spaced-comment
/*const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`*/
