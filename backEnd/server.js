'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(express.static('.public'));

const pg = require('pg');
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema, table_name FROM information_schema.tables;', (err,res) => {
  if (err) throw err;
  for (let row of res.rows){
    console.log(JSON.stringify(row));
  }
  client.end();
});


app.get('/', (request, response) => {
  response.send('hi');
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));

