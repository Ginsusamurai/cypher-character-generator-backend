'use strict';
const pg = require('pg');

require('dotenv').config();

const pgClient = new pg.Client(process.env.DATABASE_URL);
pgClient.connect();

module.exports = pgClient;